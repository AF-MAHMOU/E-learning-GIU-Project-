import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    // Endpoint for creating a new conversation
    @Post('conversation')
    async createConversation(@Body() createConversationDto: CreateConversationDto) {
        return this.chatService.createConversation(
            createConversationDto.conversationId,
            createConversationDto.participants,
            createConversationDto.createdBy
        );
    }

    // Endpoint for sending a message
    @Post('message')
    async createMessage(@Body() createMessageDto: CreateMessageDto) {
        return this.chatService.createMessage(
            createMessageDto.messageId,
            createMessageDto.conversationId,
            createMessageDto.senderId,
            createMessageDto.content,
            createMessageDto.sentAt
        );
    }
}
