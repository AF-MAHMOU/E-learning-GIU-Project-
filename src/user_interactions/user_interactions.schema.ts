import { Schema, Document } from 'mongoose';

export const UserInteractionSchema = new Schema({
    interactionId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },  // Associated user ID
    courseId: { type: String, required: true },  // Associated course ID
    score: { type: Number, required: true },
    timeSpentMinutes: { type: Number, required: true },
    lastAccessed: { type: Date, required: true },
});

export interface UserInteraction extends Document {
    interactionId: string;
    userId: string;
    courseId: string;
    score: number;
    timeSpentMinutes: number;
    lastAccessed: Date;
}
