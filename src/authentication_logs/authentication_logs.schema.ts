import { Schema, Document } from 'mongoose';

export const AuthenticationLogSchema = new Schema({
    logId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },  // User who authenticated
    event: { type: String, required: true },  // Event description (e.g., "Biometric Authentication")
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['Success', 'Failure'], required: true },
});

export interface AuthenticationLog extends Document {
    logId: string;
    userId: string;
    event: string;
    timestamp: Date;
    status: 'Success' | 'Failure';
}
