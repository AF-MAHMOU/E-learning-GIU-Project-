import { Schema, Document } from 'mongoose';

export const ProgressSchema = new Schema({
    progressId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    courseId: { type: String, required: true },
    completionPercentage: { type: Number, required: true },
    lastAccessed: { type: Date, default: Date.now },
});

export interface Progress extends Document {
    progressId: string;
    userId: string;
    courseId: string;
    completionPercentage: number;
    lastAccessed: Date;
}
