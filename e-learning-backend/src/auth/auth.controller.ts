import { Controller, Post, Body, Req, Res,Param,HttpStatus,UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Request } from 'express';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

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
      const { access_token, role } = await this.authService.login(email, password);
      return res.status(HttpStatus.OK).json({ access_token, role });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
    }
  }

  // Register route
  @Post('register')
  async register(@Body() body: any, @Res() res: Response) {
    try {
      const user = await this.authService.register(body);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  // Approve user route
  @Post('approve/:adminId/:userId')
  async approveUser(
    @Param('adminId') adminId: string,
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.authService.approveUser(adminId, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      const status = error instanceof UnauthorizedException ? HttpStatus.UNAUTHORIZED : HttpStatus.BAD_REQUEST;
      return res.status(status).json({ message: error.message });
    }
  }
// Reject user route (for rejecting instructor and deleting)
@Post('reject/:adminId/:userId')
async rejectUser(
  @Param('adminId') adminId: string,
  @Param('userId') userId: string,
  @Res() res: Response,
) {
  try {
    const result = await this.authService.rejectUser(adminId, userId);
    return res.status(HttpStatus.OK).json({ message: result });
  } catch (error) {
    const status = error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;
    return res.status(status).json({ message: error.message });
  }
}
  // Logout route
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
      await this.authService.logout(token);
      return res.status(HttpStatus.OK).json({ message: 'Logged out successfully' });
    }
    return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Token not provided' });
  }

}
