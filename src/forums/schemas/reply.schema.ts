import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReplyDocument = Reply & Document;

@Schema()
export class Reply {
    @Prop({ type: String, required: true, unique: true })
    replyId: string;

    @Prop({ type: String, required: true })
    threadId: string;

    @Prop({ type: String, required: true })
    userId: string;

    @Prop({ type: String, required: true })
    content: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);