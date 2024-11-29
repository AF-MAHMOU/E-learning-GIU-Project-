import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';  // Import AuthModule
import { User, UserSchema } from './users/schemas/user.schema';  // Import UserSchema
import { JwtModule } from '@nestjs/jwt';  // Import JwtModule

@Module({
  imports: [
    ConfigModule.forRoot(),  // Ensure .env file is loaded
    MongooseModule.forRoot(process.env.MONGODB_URL),  // MongoDB URL from .env
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),  // Define User schema
    ChatModule,
    CoursesModule,
    AuthModule,  // Add AuthModule to the imports
    JwtModule.register({
      secret: process.env.JWT_SECRET, // JWT secret from environment variables
      signOptions: { expiresIn: '1h' }, // Optional expiration
    }),  // Register JwtModule to make JwtService available globally
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
