import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { QuestionDifficulty } from '../dto/create-question.dto';

export type QuestionBankDocument = QuestionBank & Document;

@Schema({ timestamps: true })
export class QuestionBank {
  @Prop({ type: String, required: true, unique: true })
  questionBankId: string;

  @Prop({ type: String, required: true })
  moduleId: string;

  @Prop({ 
    type: [{
      difficulty: { 
        type: String, 
        enum: Object.values(QuestionDifficulty) 
      },
      questions: [{ type: String, ref: 'Question' }]
    }]
  })
  questionsByDifficulty: {
    difficulty: QuestionDifficulty;
    questions: string[];
  }[];

  @Prop({ type: String, required: true })
  createdBy: string;

}

export const QuestionBankSchema = SchemaFactory.createForClass(QuestionBank);