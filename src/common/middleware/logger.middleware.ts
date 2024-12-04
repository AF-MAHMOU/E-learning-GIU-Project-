// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request, Response, NextFunction } from 'express';
//
// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   constructor(private readonly jwtService: JwtService) {}
//
//   use(req: Request, res: Response, next: NextFunction) {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//       const token = authHeader.split(' ')[1];
//       try {
//         const decodedToken = this.jwtService.verify(token);
//         req.userRole = decodedToken.role; // Store role in request object
//         console.log('Decoded token:', decodedToken);
//       } catch (err) {
//         console.error('Invalid token:', err.message);
//       }
//     }
//     console.log(`${req.method} ${req.originalUrl}`);
//     next();
//   }
// }