import { Module } from '@nestjs/common';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { ForumController } from './forum/forum.controller';
import { ForumService } from './forum/forum.service';

@Module({
  controllers: [ChatController, ForumController],
  providers: [ChatService, ForumService]
})
export class CommunicationModule {}
