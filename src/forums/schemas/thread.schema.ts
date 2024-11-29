import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ThreadDocument = Thread & Document;

@Schema()
export class Thread {
    @Prop({ type: String, required: true, unique: true })
    threadId: string;

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    content: string;

    @Prop({ type: String, required: true })
    userId: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);