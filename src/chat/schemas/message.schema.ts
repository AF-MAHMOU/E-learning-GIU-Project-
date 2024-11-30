import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop({ type: String, required: true, unique: true })
    messageId: string;

    @Prop({ type: String, required: true })
    conversationId: string;

    @Prop({ type: String, required: true })
    senderId: string;

    @Prop({ type: String, required: true })
    content: string;

    @Prop({ type: Date, default: Date.now })
    sentAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
