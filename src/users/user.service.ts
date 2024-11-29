import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { RegisterDto } from './dto/register.dto';  // Correct path to RegisterDto
import { User, UserDocument } from './schemas/user.schema';  // Correct path to your schema

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

// Create a new user instance with the data from RegisterDto

async createUser(registerDto: RegisterDto & { password_hash: string }): Promise<User> {
  const { email, password_hash, role, name, profile_picture_url } = registerDto;

  // Check for existing user by email
  const existingUser = await this.userModel.findOne({ email });
  if (existingUser) {
    throw new ConflictException('User with this email already exists');
  }

  // Generate unique user_id
  const user_id = uuidv4();

  // Create user with populated fields
  const newUser = new this.userModel({
    email,
    password_hash,
    role,
    name,
    profile_picture_url,
    user_id,
  });

  // Save user and return
  try {
    return await newUser.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new ConflictException('Duplicate user_id detected');
    }
    throw error;
  }
}

  

  // Fetch a user by their email
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
