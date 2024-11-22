import { Schema, Document } from 'mongoose';
import { Course } from 'src/courses/schemas/courses.schema';

export const QuizSchema = new Schema({
    quizId: { type: String, required: true, unique: true },
    moduleId: { type: String, required: true },
    questions: { type: [Object], required: true },
    createdAt: { type: Date, default: Date.now },
});

export interface Quiz extends Course {
    quizId: string;
    moduleId: string;
    questions: object[];
    createdAt: Date;
}
