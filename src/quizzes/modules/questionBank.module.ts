import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionBankService } from '../services/questionBank.service';
import { QuestionBankController } from '../controllers/questionBank.controller';
import { QuestionBank, QuestionBankSchema } from '../schemas/questionBank.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: QuestionBank.name, schema: QuestionBankSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [QuestionBankController],
  providers: [QuestionBankService],
})
export class QuestionBankModule {}
