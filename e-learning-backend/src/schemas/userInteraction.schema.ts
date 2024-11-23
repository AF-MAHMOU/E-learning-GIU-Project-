// Additional Feature

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserInteraction extends Document {
    @Prop({ required: true })
    interaction_id: string;

    @Prop({ required: true })
    user_id: string;

    @Prop({ required: true })
    course_id: string;

    @Prop({ required: true })
    score: number;

    @Prop({ required: true })
    time_spent_minutes: number;

    @Prop({ default: Date.now })
    last_accessed: Date;
}

export const UserInteractionSchema = SchemaFactory.createForClass(UserInteraction);