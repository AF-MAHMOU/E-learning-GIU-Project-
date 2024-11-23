import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Course, CourseSchema } from './schemas/course.schema';
import { CourseModule, ModuleSchema } from './schemas/module.schema';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { Response, ResponseSchema } from './schemas/response.schema';
import { Progress, ProgressSchema } from './schemas/progress.schema';
import { Note, NoteSchema } from './schemas/notes.schema';
import { UserInteraction, UserInteractionSchema } from './schemas/userInteraction.schema';
import { Recommendation, RecommendationSchema } from './schemas/recommendation.schema';
import { AuthenticationLog, AuthenticationLogSchema } from './schemas/authentication.schema.log';
import { Configuration, ConfigurationSchema } from './schemas/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Course.name, schema: CourseSchema },
      { name: CourseModule.name, schema: ModuleSchema },
      { name: Quiz.name, schema: QuizSchema },
      { name: Response.name, schema: ResponseSchema },
      { name: Progress.name, schema: ProgressSchema },
      { name: Note.name, schema: NoteSchema },
      { name: UserInteraction.name, schema: UserInteractionSchema },
      { name: Recommendation.name, schema: RecommendationSchema },
      { name: AuthenticationLog.name, schema: AuthenticationLogSchema },
      { name: Configuration.name, schema: ConfigurationSchema },
    ]),
  ],
})
export class AppModule {}