import { Schema, Document } from 'mongoose';

export const ModuleSchema = new Schema({
    moduleId: { type: String, required: true, unique: true },
    courseId: { type: String, required: true },  // Associated course ID
    title: { type: String, required: true },
    content: { type: String, required: true },
    resources: { type: [String] },  // Array of URLs
    createdAt: { type: Date, default: Date.now },
});

export interface Module extends Document {
    moduleId: string;
    courseId: string;
    title: string;
    content: string;
    resources?: string[];
    createdAt: Date;
}
