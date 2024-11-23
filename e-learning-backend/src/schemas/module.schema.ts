import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CourseModule extends Document {
    @Prop({ required: true })
    module_id: string;

    @Prop({ required: true })
    course_id: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop()
    resources?: string[];

    @Prop({ default: Date.now })
    created_at: Date;
}

export const ModuleSchema = SchemaFactory.createForClass(CourseModule);

