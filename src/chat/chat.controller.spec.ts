import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

describe('ChatController', () => {
    let controller: ChatController;
    let service: ChatService;

    beforeEach(async () => {
        const mockChatService = {
            createMessage: jest.fn().mockResolvedValue({
                messageId: 'msg-12345',
                conversationId: 'conv-12345',
                senderId: 'user1',
                content: 'Hello!',
                sentAt: new Date(),
            }),
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

    describe('createMessage', () => {
        it('should send a message', async () => {
            const createMessageDto: CreateMessageDto = {
                messageId: 'msg-12345',
                conversationId: 'conv-12345',
                senderId: 'user1',
                content: 'Hello!',
                sentAt: new Date(),
            };

            const result = await controller.createMessage(createMessageDto);

            expect(result).toEqual({
                messageId: 'msg-12345',
                conversationId: 'conv-12345',
                senderId: 'user1',
                content: 'Hello!',
                sentAt: new Date(),
            });
            expect(service.createMessage).toHaveBeenCalledWith(createMessageDto);
        });
    });
});
