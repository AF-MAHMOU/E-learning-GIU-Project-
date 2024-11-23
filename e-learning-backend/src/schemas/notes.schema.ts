import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Note extends Document {
    @Prop({ required: true })
    note_id: string;

    @Prop({ required: true })
    user_id: string;

    @Prop()
    course_id?: string;

    @Prop({ required: true })
    content: string;

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    last_updated: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);