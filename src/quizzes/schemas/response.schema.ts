import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Response extends Document {
    @Prop({ required: true })
    responseId: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    quizId: string;

    @Prop({ required: true })
    answers: Record<string, any>[];

    @Prop({ required: true })
    score: number;

    @Prop({ required: true })
    submittedAt: Date;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);