import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async createUser(userDto: any): Promise<User> {
        const newUser = new this.userModel(userDto);
        return newUser.save();
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
