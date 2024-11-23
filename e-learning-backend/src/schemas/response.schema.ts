import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Response extends Document {
    @Prop({ required: true })
    response_id: string;

    @Prop({ required: true })
    user_id: string;

    @Prop({ required: true })
    quiz_id: string;

    @Prop({ required: true })
    answers: { question_id: string, answer: string }[];

    @Prop({ required: true })
    score: number;

    @Prop({ default: Date.now })
    submitted_at: Date;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);