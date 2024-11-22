import { Schema, Document } from 'mongoose';

export const ResponseSchema = new Schema({
    responseId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },  // User who submitted the response
    quizId: { type: String, required: true },  // Associated quiz ID
    answers: { type: [Schema.Types.Mixed], required: true },  // User's answers
    score: { type: Number, required: true },  // Score received
    submittedAt: { type: Date, default: Date.now },
});

export interface Response extends Document {
    responseId: string;
    userId: string;
    quizId: string;
    answers: object[];
    score: number;
    submittedAt: Date;
}
