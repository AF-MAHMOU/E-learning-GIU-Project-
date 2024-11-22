import { Schema, Document } from 'mongoose';

export const NoteSchema = new Schema({
    noteId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },  // User who created the note
    courseId: { type: String },  // Optional, associated course ID
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
});

export interface Note extends Document {
    noteId: string;
    userId: string;
    courseId?: string;
    content: string;
    createdAt: Date;
    lastUpdated: Date;
}
