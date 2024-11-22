import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { PerformanceModule } from './performance/performance.module';
import { CommunicationModule } from './communication/communication.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule,MongooseModule.forRoot('mongodb+srv://ahmed_lotfy:123main123@softwareproject-mainclu.ahf0u.mongodb.net/'), UsersModule, CoursesModule, QuizzesModule, PerformanceModule, CommunicationModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
