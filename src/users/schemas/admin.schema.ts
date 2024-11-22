import { Schema, Document } from 'mongoose';
import { User, UserSchema } from './user.schema';

export interface Admin extends User {
}
