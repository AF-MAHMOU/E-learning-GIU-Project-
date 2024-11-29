import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { getModelToken } from '@nestjs/mongoose';
import { Conversation } from './schemas/conversation.schema';
import { Message } from './schemas/message.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

describe('ChatService', () => {
  let service: ChatService;
  let conversationModel: Model<Conversation>;
  let messageModel: Model<Message>;

  // Mock data
  const mockConversation = {
    conversationId: uuidv4(),
    participants: ['user1', 'user2'],
    createdAt: new Date(),
  };
  const mockMessage = {
    messageId: uuidv4(),
    conversationId: mockConversation.conversationId,
    senderId: 'user1',
    content: 'Hello!',
    sentAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: getModelToken(Conversation.name),
          useValue: {
            find: jest.fn().mockResolvedValue([mockConversation]),  // Mocking methods
            create: jest.fn().mockResolvedValue(mockConversation),
          },
        },
        {
          provide: getModelToken(Message.name),
          useValue: {
            find: jest.fn().mockResolvedValue([mockMessage]),
            create: jest.fn().mockResolvedValue(mockMessage),
          },
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
    conversationModel = module.get<Model<Conversation>>(getModelToken(Conversation.name));
    messageModel = module.get<Model<Message>>(getModelToken(Message.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createConversation', () => {
    it('should create a new conversation', async () => {
      const createConversationDto = { participants: ['user1', 'user2'] };
      const result = await service.createConversation(createConversationDto);

      expect(result).toEqual(mockConversation);
      expect(conversationModel.create).toHaveBeenCalledWith(createConversationDto);
    });
  });

  describe('sendMessage', () => {
    it('should send a message', async () => {
      const sendMessageDto = {
        conversationId: mockConversation.conversationId,
        senderId: 'user1',
        content: 'Hello!',
      };

      const result = await service.sendMessage(sendMessageDto);

      expect(result).toEqual(mockMessage);
      expect(messageModel.create).toHaveBeenCalledWith(sendMessageDto);
    });
  });

  // Add more tests as needed
});
