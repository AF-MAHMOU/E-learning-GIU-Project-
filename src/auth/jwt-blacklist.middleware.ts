import { Injectable, UnauthorizedException, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtBlacklistMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  use(req: any, res: any, next: () => void) {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('Token not found');
    }

    // Extract the token from the Bearer format
    const token = authorizationHeader.split(' ')[1]; // 'Bearer <token>'

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    // Check if the token is blacklisted
    if (this.authService.isTokenBlacklisted(token)) {
      throw new UnauthorizedException('Token is invalidated');
    }

    try {
      // Verify the token with the secret
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET, // Pass the JWT secret here
      });
      req.user = decoded; // Attach the decoded user info to the request
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
