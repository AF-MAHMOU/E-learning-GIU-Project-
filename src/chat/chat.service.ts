import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    ) {}

    // Send a new message
    async createMessage(createMessageDto: CreateMessageDto) {
        const { conversationId, senderId, content } = createMessageDto;

        // Create unique message ID using UUID
        const messageId = uuidv4();

        // Create new message
        const message = new this.messageModel({
            messageId,
            conversationId,
            senderId,
            content,
            sentAt: new Date(),
        });

        return await message.save();
    }
}
