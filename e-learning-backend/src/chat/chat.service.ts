import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation, ConversationDocument } from './schemas/conversation.schema';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>,
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    ) {}

    /**
     * Create a new conversation
     * @param participants - Array of participant user IDs
     */
    async createConversation(participants: string[]): Promise<ConversationDocument> {
        // Generate a unique conversation ID
        const conversationId = `CONV-${Date.now()}`;

        // Create and save the conversation
        const conversation = new this.conversationModel({
            conversationId,
            participants,
            createdAt: new Date(),
        });

        return await conversation.save();
    }

    async createMessage(conversationId: string, senderId: string, content: string): Promise<MessageDocument> {
        // Validate that the conversation exists
        const conversation = await this.conversationModel.findOne({ conversationId });
        if (!conversation) {
            throw new NotFoundException(`Conversation with ID "${conversationId}" not found.`);
        }

        // Generate a unique message ID
        const messageId = `MSG-${Date.now().toString()}`;

        // Create and save the message
        const message = new this.messageModel({
            messageId,
            conversationId,
            senderId,
            content,
            sentAt: new Date(),
        });

        return await message.save();
    }

    async getMessagesByConversation(conversationId: string): Promise<MessageDocument[]> {
        // Fetch messages by conversationId and sort them by sentAt
        return this.messageModel.find({conversationId}).sort({sentAt: 1});
    }

    async getUserConversations(userId: string): Promise<ConversationDocument[]> {
        // Fetch conversations where the user is a participant
        return this.conversationModel.find({participants: userId});
    }
}