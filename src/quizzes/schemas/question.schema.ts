import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
    @Prop({ type: String, required: true, unique: true })
    questionId: string;

    @Prop({ type: String, required: true })
    quizId: string;

    @Prop({ type: String, required: true })
    text: string;

    @Prop({ type: Array, required: true })
    options: string[];

    @Prop({ type: String, required: true })
    correctAnswer: string;

    @Prop({ type: String, required: true, enum: ['MCQ', 'TrueFalse'] })
    type: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);