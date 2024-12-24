import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { Progress, ProgressSchema } from './schemas/progress.schema';
import { RolesGuard } from '../common/guards/roles.guard'; // Import RolesGuard
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Progress.name, schema: ProgressSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret', // Use your JWT secret
      signOptions: { expiresIn: '1h' }, // Adjust expiration as needed
    }),
  ],
  controllers: [AnalyticsController],
  providers: [
    AnalyticsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Apply RolesGuard globally
    },
  ],
})
export class AnalyticsModule {}
