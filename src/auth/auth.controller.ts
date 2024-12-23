import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login route
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const { email, password } = body;
    try {
      // This should return the token after successful login
      const { access_token, role } = await this.authService.login(
        email,
        password,
      );
      return res.json({ access_token, role });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  // Register route
  @Post('register')
  async register(@Body() body: any, @Res() res: Response) {
    try {
      // Register the new user without requiring a token
      const user = await this.authService.register(body);
      return res.status(201).json(user); // Return the created user or a success message
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Logout route
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    if (token) {
      // Invalidate token by adding it to the blacklist
      await this.authService.logout(token);
      return res.json({ message: 'Logged out successfully' });
    }
    return res.status(400).json({ message: 'Token not provided' });
  }
}
