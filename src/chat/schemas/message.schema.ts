import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop({ type: String, required: false, unique: true })
    messageId: string; // Unique identifier for the message

    @Prop({ type: String, required: true })
    conversationId: string; // Reference to the conversation

    @Prop({ type: String, required: true })
    senderId: string; // User ID of the sender

    @Prop({ type: String, required: true })
    content: string; // Message content

    @Prop({ type: Date, default: Date.now })
    sentAt: Date; // Timestamp of when the message was sent
}

export const MessageSchema = SchemaFactory.createForClass(Message);