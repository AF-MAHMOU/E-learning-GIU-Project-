import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Configuration extends Document {
    @Prop({ required: true })
    config_id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: Object, required: true })
    settings: Record<string, any>;
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);