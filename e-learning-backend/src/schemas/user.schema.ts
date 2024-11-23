import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    user_id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password_hash: string;

    @Prop({ required: true })
    role: string;

    @Prop()
    profile_picture_url?: string;

    @Prop({ default: Date.now })
    created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);