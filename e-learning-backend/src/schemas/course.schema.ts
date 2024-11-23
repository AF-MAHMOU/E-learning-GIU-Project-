import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Course extends Document {
    @Prop({ required: true })
    course_id: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    difficulty_level: string;

    @Prop({ required: true })
    created_by: string;

    @Prop({ default: Date.now })
    created_at: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);