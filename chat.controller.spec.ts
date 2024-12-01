import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
//hena b test el controller behaviour f probably ha3ml mock (activated mock)
describe('ChatController', () => {
  let controller: ChatController;
  let service: ChatService;

  beforeEach(async () => {
    const mockChatService = {
      createConversation: jest.fn(),
      createMessage: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        {
          provide: ChatService,
          useValue: mockChatService,
        },
      ],
    }).compile();

    controller = module.get<ChatController>(ChatController);
    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createConversation', () => {
    it('should create a conversation', async () => {
      const createConversationDto: CreateConversationDto = {
        conversationId: 'conv-12345',
        participants: ['user1', 'user2'],
        createdBy: 'user1',
      };


      (service.createConversation as jest.Mock).mockResolvedValue(createConversationDto);

      const result = await controller.createConversation(createConversationDto);

      expect(result).toEqual(createConversationDto);
      expect(service.createConversation).toHaveBeenCalledWith(
        createConversationDto.conversationId,
        createConversationDto.participants,
        createConversationDto.createdBy,
      );
    });
  });

  describe('createMessage', () => {
    it('should send a message', async () => {
      const createMessageDto: CreateMessageDto = {
        messageId: 'msg-12345',
        conversationId: 'conv-12345',
        senderId: 'user1',
        content: 'Hello, this is a test message.',
        sentAt: new Date(), //removed toString as Date() is of type Date
      };


      (service.createMessage as jest.Mock).mockResolvedValue(createMessageDto);

      const result = await controller.createMessage(createMessageDto);

      expect(result).toEqual(createMessageDto);
      expect(service.createMessage).toHaveBeenCalledWith(
        createMessageDto.messageId,
        createMessageDto.conversationId,
        createMessageDto.senderId,
        createMessageDto.content,
        createMessageDto.sentAt,
      );
    });
  });
});