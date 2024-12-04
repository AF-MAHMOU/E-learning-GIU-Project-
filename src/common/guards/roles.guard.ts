import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('Required Roles:', requiredRoles); // Debug required roles
  
    if (!requiredRoles) {
      return true; // No roles required, allow access
    }
  
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    console.log('Authorization Header:', authHeader); // Debug header
  
    if (!authHeader) {
      console.error('Unauthorized access: Authorization header not found');
      throw new UnauthorizedException('Authorization header missing');
    }
  
    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token); // Debug token
  
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET, // Explicitly provide the secret here
      });
      console.log('Decoded Token:', decodedToken); // Debug decoded token
  
      request.user = { roles: [decodedToken.role] }; // Set user roles from token
    } catch (err) {
      console.error('Token Verification Error:', err.message); // Debug error
      throw new UnauthorizedException('Invalid or expired token');
    }
  
    const { user } = request;
    console.log('User Roles from Token:', user.roles); // Debug user roles
  
    const hasRole = requiredRoles.some((role) => user.roles.includes(role));
    console.log('Has Required Role:', hasRole); // Debug role check result
  
    if (!hasRole) {
      console.error('Access Denied: User lacks required roles');
      throw new UnauthorizedException('Access denied');
    }
  
    return hasRole;
  }
}  