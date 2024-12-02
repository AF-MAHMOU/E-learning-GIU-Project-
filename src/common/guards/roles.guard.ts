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
    console.log('Required Roles:', requiredRoles); // Log required roles
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      console.error('Unauthorized access: Authorization header not found');
      throw new UnauthorizedException('Unauthorized access');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = this.jwtService.verify(token);
      request.user = { roles: [decodedToken.role] }; // Initialize user roles from token
      console.log('Decoded Token:', decodedToken); // Log decoded token
    } catch (err) {
      console.error('Invalid token:', err.message);
      throw new UnauthorizedException('Unauthorized access');
    }

    const { user } = request;
    console.log('User:', user); // Log user object
    if (!user || !user.roles) {
      console.error('Unauthorized access: User or roles not found');
      throw new UnauthorizedException('Unauthorized access');
    }

    const hasRole = requiredRoles.some((role) => user.roles.includes(role));
    console.log('User Roles:', user.roles); // Log user roles
    console.log('Has Role:', hasRole); // Log role check result
    if (!hasRole) {
      console.error('Unauthorized access: User does not have required roles');
      throw new UnauthorizedException('Unauthorized access');
    }
    return hasRole;
  }
}