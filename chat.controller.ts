import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
//Added missing conversationId
//CreateConversationDto and CreateMessageDto contain fields needed for the service methods.
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post('conversation')
    async createConversation(@Body() createConversationDto: CreateConversationDto) {
        return this.chatService.createConversation(createConversationDto);
    }

    @Post('message')
    async createMessage(@Body() createMessageDto: CreateMessageDto) {
        return this.chatService.createMessage(createMessageDto);
    }
}
