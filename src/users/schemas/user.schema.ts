import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
    timestamps: { createdAt: 'created_at', updatedAt: false },
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password_hash;
            delete ret.__v;
            return ret;
        },
    },
})
export class User {
    @Prop({
        type: String,
        unique: true,
        required: false,
        index: true,
    })
    user_id: string;   

    @Prop({
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    })
    name: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    })
    email: string;

    @Prop({
        type: String,
        required: true,
        minlength: 6,
    })
    password_hash: string;

    @Prop({
        type: String,
        required: true,
        enum: ['student', 'instructor', 'admin'],
        default: 'student',
    })
    role: string;

    @Prop({
        type: String,
        required: false,
    })
    profile_picture_url?: string;

    @Prop({
        type: Date,
        default: Date.now,
        immutable: true,
    })
    created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// indexes to ensure uniqueness
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ user_id: 1 }, { unique: true });


UserSchema.pre('save', async function(next) {
    if (this.isNew && !this.user_id) {
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 1000);
      this.user_id = `USR${timestamp}${random}`;
      console.log('Generated user_id:', this.user_id);  // Log the generated ID
    }
    next();
  });
  
