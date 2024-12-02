import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (isPasswordValid) {
      const payload = {
        userId: user.user_id,
        email: user.email,
        role: user.role,
      };
      const token = this.jwtService.sign(payload);
      console.log('Generated Token:', token); // Add this line to debug
      return { access_token: token, role: user.role };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  // Register function
  async register(registerDto: any) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    return this.usersService.createUser({
      ...registerDto,
      password_hash: hashedPassword,
    });
  }

  // Logout function: Add token to blacklist
  async logout(token: string) {
    this.blacklistedTokens.push(token); // Add token to blacklist (in-memory or DB)
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
      const decoded = this.jwtService.verify(token); // This will throw if the token is expired or invalid
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token', error);
    }
  }
}
