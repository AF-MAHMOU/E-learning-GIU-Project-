import { Schema, Document } from 'mongoose';

export const ConfigurationSchema = new Schema({
    configId: { type: String, required: true, unique: true },
    settings: { type: Map, of: Schema.Types.Mixed, required: true },  // Key-value pairs for app settings
    updatedBy: { type: String, required: true },  // User who last updated the config
    updatedAt: { type: Date, default: Date.now },
});

export interface Configuration extends Document {
    configId: string;
    settings: Map<string, any>;
    updatedBy: string;
    updatedAt: Date;
}
