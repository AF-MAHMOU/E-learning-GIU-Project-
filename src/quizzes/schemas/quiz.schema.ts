import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { QuestionDifficulty } from '../dto/create-quiz.dto';

export type QuizDocument = Quiz & Document;

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ type: String, required: true, unique: true })
  quizId: string;

  @Prop({ type: String, required: true })
  moduleId: string;

  @Prop({ type: String, required: true })
  createdBy: string;

  @Prop({ 
    type: [{
      difficulty: { type: String, enum: Object.values(QuestionDifficulty) },
      numberOfQuestions: { type: Number, min: 1 }
    }]
  })
  questionSelectionCriteria: {
    difficulty: QuestionDifficulty;
    numberOfQuestions: number;
  }[];

  @Prop({ type: [String], required: true })
  questions: string[];

  @Prop({ type: String, enum: ['MCQ', 'TRUE_OR_FALSE'] })
  quizType: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);