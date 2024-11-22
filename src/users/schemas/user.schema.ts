import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['student', 'instructor', 'admin'], required: true },
    profilePictureUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export interface User extends Document {
    userId: string;
    name: string;
    email: string;
    passwordHash: string;
    role: 'student' | 'instructor' | 'admin';
    profilePictureUrl?: string;
    createdAt: Date;
}
