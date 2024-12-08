import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    NotFoundException,
    UseGuards,
  } from '@nestjs/common';
  import { ChatService } from './chat.service';
  import { CreateMessageDto } from './dto/create-message.dto';
  import { RolesGuard } from '../common/guards/roles.guard';
  import { Roles } from '../common/decorators/roles.decorator';
  import { Role } from '../common/enums/role.enum';
  
  @Controller('chat')
  export class ChatController {
    constructor(private readonly chatService: ChatService) {}
  
    // Students and Instructors can create conversations
    @Post('conversation')
    @UseGuards(RolesGuard)
    @Roles(Role.Student, Role.Instructor)
    async createConversation(@Body('participants') participants: string[]) {
      if (!participants || participants.length < 2) {
        throw new NotFoundException('At least two participants are required.');
      }
      return this.chatService.createConversation(participants);
    }
  
    // Students and Instructors can send messages
    @Post('message')
    @UseGuards(RolesGuard)
    @Roles(Role.Student, Role.Instructor)
    async createMessage(@Body() createMessageDto: CreateMessageDto) {
      const { conversationId, senderId, content } = createMessageDto;
  
      if (!conversationId || !senderId || !content) {
        throw new NotFoundException('Missing required fields.');
      }
  
      return this.chatService.createMessage(conversationId, senderId, content);
    }
  
    // Students and Instructors can view messages in a conversation
    @Get('conversation/:conversationId/messages')
    @UseGuards(RolesGuard)
    @Roles(Role.Student, Role.Instructor)
    async getMessages(@Param('conversationId') conversationId: string) {
      return this.chatService.getMessagesByConversation(conversationId);
    }
  
    // Students and Instructors can view their conversations
    @Get('user/:userId/conversations')
    @UseGuards(RolesGuard)
    @Roles(Role.Student, Role.Instructor)
    async getUserConversations(@Param('userId') userId: string) {
      return this.chatService.getUserConversations(userId);
    }
  }
  