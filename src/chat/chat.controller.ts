import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    // Endpoint for sending a message
    @Post('message')
    async createMessage(@Body() createMessageDto: CreateMessageDto) {
        return this.chatService.createMessage(createMessageDto);
    }
}
