import { Injectable, UnauthorizedException,NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly blacklistedTokens: string[] = []; // In-memory blacklist (use a DB like Redis for persistence)

  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Login function
  async login(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.approved && user.role == 'instructor') {
      throw new UnauthorizedException('Your account is pending approval');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (isPasswordValid) {
      const payload = {
        userId: user.user_id,
        email: user.email,
        role: user.role,
      };
      const token = this.jwtService.sign(payload);
      return { access_token: token, role: user.role };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  // Register function
  async register(registerDto: any) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const isInstructor = registerDto.role === 'instructor';

    return this.usersService.createUser({
      ...registerDto,
      password_hash: hashedPassword,
      approved: !isInstructor, // Instructors need admin approval
    });
  }

  // Approve user function
  async approveUser(adminId: string, userId: string) {
    const admin = await this.usersService.findUserById(adminId);

    if (admin.role !== 'admin') {
      throw new UnauthorizedException('Only admins can approve users');
    }

    const user = await this.usersService.updateUser(userId, { approved: true });
    if (!user) {
      throw new Error('User not found');
    }

    return { message: `User ${user.name} has been approved.` };
  }

  // Reject an instructor by deleting the user
  async rejectUser(adminId: string, userId: string): Promise<string> {
    const admin = await this.usersService.findUserById(adminId);
    if (!admin || admin.role !== 'admin') {
      throw new NotFoundException('Admin not found or not authorized');
    }

    const user = await this.usersService.findUserById(userId);
    if (!user || user.role !== 'instructor') {
      throw new NotFoundException('Instructor not found');
    }

    // Delete the instructor from the database
    await this.usersService.findByIdAndDelete(userId);

    return `Instructor ${user.name} has been rejected and deleted from the system.`;
  }

  // Logout function
  async logout(token: string) {
    this.blacklistedTokens.push(token); // Add token to blacklist
    return { message: 'Logged out successfully' };
  }

  // Check if token is blacklisted
  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.includes(token);
  }

  // Middleware to verify if token is valid and not blacklisted
  async verifyToken(token: string) {
    if (this.isTokenBlacklisted(token)) {
      throw new UnauthorizedException('Token has been blacklisted');
    }

    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token', error);
    }
  }
}
