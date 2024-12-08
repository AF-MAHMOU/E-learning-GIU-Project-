import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { QuizzesModule } from "./quizzes/modules/quizzes.module";
import { QuizzesController } from "./quizzes/controllers/quizzes.controller";
import { QuizzesService } from "./quizzes/services/quizzes.service";
import { QuestionModule } from "./quizzes/modules/question.module";
import { QuestionBankModule } from "./quizzes/modules/questionBank.module";
import { User, UserSchema } from './users/schemas/user.schema';
import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { RolesGuard } from "./common/guards/roles.guard";
import { UserService } from "./users/user.service";
import { AuthController } from "./auth/auth.controller";
import { AnalyticsModule } from './analytics/analytics.module';

console.log('MONGODB_URL:', process.env.MONGODB_URL);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Ensure .env file is loaded globally
      envFilePath: './src/.env', // Specify the path to the .env file
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL), // MongoDB URL from .env
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Define User schema
    ChatModule,
    CoursesModule,
    QuizzesModule,
    QuestionModule,
    QuestionBankModule,
    AnalyticsModule,
    AuthModule, // Add AuthModule to the imports
    JwtModule.register({
      secret: process.env.JWT_SECRET, // JWT secret from environment variables
      signOptions: { expiresIn: '1h' }, // Optional expiration
    }), // Register JwtModule to make JwtService available globally
  ],
  controllers: [AppController,],
  providers: [AppService, JwtService,]
})
export class AppModule {}
