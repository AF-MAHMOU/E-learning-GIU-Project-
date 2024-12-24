import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  })
  difficulty: string;

  @Prop({ type: [String], default: [] }) // List of student IDs
  enrolledStudents: string[];

  @Prop({ type: String, required: true })
  category: string;

  // Referenced by instructor
  @Prop({ type: String, required: true })
  createdBy: string;

  @Prop({ type: Date, default: Date.now, immutable: true })
  createdAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
