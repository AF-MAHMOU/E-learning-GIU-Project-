import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { QuestionType, QuestionDifficulty } from '../dto/create-question.dto';

export type QuestionDocument = Question & Document;

@Schema({ timestamps: true })
export class Question {
  @Prop({ type: String, required: true, unique: true })
  questionId: string;

  @Prop({ type: String, required: true })
  questionBankId: string;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({ 
    type: String, 
    enum: Object.values(QuestionType), 
    required: true 
  })
  type: QuestionType;

  @Prop({ 
    type: String, 
    enum: Object.values(QuestionDifficulty), 
    required: true 
  })
  difficulty: QuestionDifficulty;

  @Prop({ 
    type: [{
      text: { type: String, required: true },
      isCorrect: { type: Boolean, default: false }
    }],
    required: true
  })
  options: {
    text: string;
    isCorrect: boolean;
  }[];

  @Prop({ type: String, required: true })
  correctAnswer: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);