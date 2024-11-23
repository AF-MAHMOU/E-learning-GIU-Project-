import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Quiz extends Document {
    @Prop({ required: true })
    quiz_id: string;

    @Prop({ required: true })
    module_id: string;

    @Prop({ required: true })
    questions: { question: string, options: string[], correct_option: string }[];

    @Prop({ default: Date.now })
    created_at: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);