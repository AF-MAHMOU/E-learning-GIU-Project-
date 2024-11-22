import { Schema, Document } from 'mongoose';

export const RecommendationSchema = new Schema({
    recommendationId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },  // Associated user ID
    recommendedItems: { type: [String], required: true },  // Array of recommended courses/modules
    generatedAt: { type: Date, default: Date.now },
});

export interface Recommendation extends Document {
    recommendationId: string;
    userId: string;
    recommendedItems: string[];
    generatedAt: Date;
}
