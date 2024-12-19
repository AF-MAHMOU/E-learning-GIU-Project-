import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzesService } from '../services/quizzes.service';
import { QuizzesController } from '../controllers/quizzes.controller';
import { Quiz, QuizSchema } from '../schemas/quiz.schema';
import { QuestionBank, QuestionBankSchema } from '../schemas/questionBank.schema';
import { Question, QuestionSchema } from '../schemas/question.schema';
import { Response, ResponseSchema } from '../schemas/response.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: Quiz.name, schema: QuizSchema },
          { name: QuestionBank.name, schema: QuestionBankSchema },
          { name: Question.name, schema: QuestionSchema },
          { name: Response.name, schema: ResponseSchema },
        ]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [QuizzesController],
    providers: [QuizzesService],
    exports: [QuizzesService],
})
export class QuizzesModule {}
