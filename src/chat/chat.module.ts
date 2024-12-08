import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Message, MessageSchema } from './schemas/message.schema';
import { Conversation, ConversationSchema } from './schemas/conversation.schema';
import { RolesGuard } from '../common/guards/roles.guard'; // Import RolesGuard
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use your secret from environment variables
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [ChatController],
  providers: [
    ChatService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Apply RolesGuard globally if needed
    },
  ],
})
export class ChatModule {}
