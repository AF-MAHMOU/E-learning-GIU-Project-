// Additional Feature

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Recommendation extends Document {
    @Prop({ required: true })
    recommendation_id: string;

    @Prop({ required: true })
    user_id: string;

    @Prop({ required: true })
    recommended_items: string[];

    @Prop({ default: Date.now })
    generated_at: Date;
}

export const RecommendationSchema = SchemaFactory.createForClass(Recommendation);