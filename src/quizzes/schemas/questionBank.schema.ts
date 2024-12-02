import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionBankDocument = QuestionBank & Document;

@Schema()
export class QuestionBank {
    @Prop({ type: String, required: true, unique: true })
    questionBankId: string;

    @Prop({ type: String, required: true })
    moduleId: string;

    @Prop({ type: [String], required: true })
    questions: string[];
}

export const QuestionBankSchema = SchemaFactory.createForClass(QuestionBank);