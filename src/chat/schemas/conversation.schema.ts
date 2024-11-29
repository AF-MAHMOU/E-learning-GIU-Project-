import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
    @Prop({ type: String, required: true, unique: true })
    conversationId: string;

    @Prop({ type: [String], required: true })
    participants: string[];

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);