import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { QuestionService } from '../services/question.service';
import { QuestionController } from '../controllers/question.controller';
import { Question, QuestionSchema } from '../schemas/question.schema';
import { QuestionBank, QuestionBankSchema } from '../schemas/questionBank.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: QuestionBank.name, schema: QuestionBankSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}