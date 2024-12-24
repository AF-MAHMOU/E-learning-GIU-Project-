import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
    @Prop({ type: String, required: true, unique: true })
    conversationId: string; // Unique identifier for the conversation

    @Prop({ type: [String], required: true })
    participants: string[]; // Array of participant user IDs

    @Prop({ type: Date, default: Date.now })
    createdAt: Date; // Timestamp of conversation creation
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);