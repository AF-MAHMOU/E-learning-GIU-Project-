import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ModuleDocument = Module & Document;

@Schema()
export class Module {
    @Prop({ type: String, required: true, unique: true })
    id: string;

    @Prop({ type: String, required: true })
    courseId: string;

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    content: string;

    @Prop({ type: [String], required: false })
    resources?: string[];

    @Prop({ type: Date, default: Date.now, immutable: true })
    createdAt: Date;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);