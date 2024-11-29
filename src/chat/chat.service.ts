import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation, ConversationDocument } from './schemas/conversation.schema';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>,
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    ) {}

    // Create a new conversation
    async createConversation(createConversationDto: CreateConversationDto) {
        const { participants } = createConversationDto;

        // Create unique conversation ID using UUID
        const conversationId = uuidv4();

        // Check if the conversation already exists for these participants
        const existingConversation = await this.conversationModel.findOne({
            participants: { $all: participants },  // Check if conversation already exists with the same participants
        });

        if (existingConversation) {
            throw new ForbiddenException('A conversation with these participants already exists');
        }

        // Create new conversation
        const newConversation = new this.conversationModel({
            conversationId,
            participants,
            createdAt: new Date(),
        });

        return await newConversation.save();
    }

    // Send a new message
    async createMessage(createMessageDto: CreateMessageDto) {
        const { conversationId, senderId, content } = createMessageDto;

        // Check if the conversation exists
        const conversation = await this.conversationModel.findOne({ conversationId });
        if (!conversation) {
            throw new NotFoundException('Conversation not found');
        }

        // Check if sender is a participant of the conversation
        if (!conversation.participants.includes(senderId)) {
            throw new ForbiddenException('Sender is not a participant of this conversation');
        }

        // Create new message
        const message = new this.messageModel({
            messageId: uuidv4(),
            conversationId,
            senderId,
            content,
            sentAt: new Date(),
        });

        return await message.save();
    }

    // Get all messages in a conversation
    async getMessages(conversationId: string) {
        const conversation = await this.conversationModel.findOne({ conversationId });
        if (!conversation) {
            throw new NotFoundException('Conversation not found');
        }

        return await this.messageModel.find({ conversationId });
    }

    // Get specific message by ID
    async getMessage(messageId: string) {
        const message = await this.messageModel.findOne({ messageId });
        if (!message) {
            throw new NotFoundException('Message not found');
        }

        return message;
    }

    // Get all conversations for a specific user
    async getConversationsForUser(userId: string) {
        return await this.conversationModel.find({
            participants: userId,
        });
    }

    // Archive a conversation (soft delete)
    async archiveConversation(conversationId: string, userId: string) {
        const conversation = await this.conversationModel.findOne({ conversationId });
        if (!conversation) {
            throw new NotFoundException('Conversation not found');
        }

        // Ensure the user is a participant before archiving
        if (!conversation.participants.includes(userId)) {
            throw new ForbiddenException('User is not a participant of this conversation');
        }

        // Archive the conversation (soft delete or just mark as archived)
        return await this.conversationModel.findByIdAndUpdate(
            conversationId,
            { $set: { status: 'archived' } },
            { new: true },
        );
    }
}
