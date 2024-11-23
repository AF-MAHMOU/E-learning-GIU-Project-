import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Progress extends Document {
    @Prop({ required: true })
    progress_id: string;

    @Prop({ required: true })
    user_id: string;

    @Prop({ required: true })
    course_id: string;

    @Prop({ required: true })
    completion_percentage: number;

    @Prop({ default: Date.now })
    last_accessed: Date;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);