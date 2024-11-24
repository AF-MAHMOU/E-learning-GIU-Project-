import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
    @Prop({ type: String, required: true, unique: true })
    quizId: string;

    @Prop({ type: String, required: true })
    moduleId: string;

    @Prop({ type: Array, required: true })
    questions: object[];

    @Prop({ type: Date, default: Date.now, immutable: true })
    createdAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);