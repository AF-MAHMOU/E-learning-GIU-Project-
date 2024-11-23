// Additional Feature

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AuthenticationLog extends Document {
    @Prop({ required: true })
    log_id: string;

    @Prop({ required: true })
    user_id: string;

    @Prop({ required: true })
    event: string;

    @Prop({ default: Date.now })
    timestamp: Date;

    @Prop({ required: true })
    status: string;
}

export const AuthenticationLogSchema = SchemaFactory.createForClass(AuthenticationLog);