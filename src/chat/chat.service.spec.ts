import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { Message } from './schemas/message.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

describe('ChatService', () => {
    let service: ChatService;
    let messageModel: Model<Message>;

    const mockMessage = {
        messageId: uuidv4(),
        conversationId: 'conv-12345',
        senderId: 'user1',
        content: 'Hello!',
        sentAt: new Date(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChatService,
                {
                    provide: getModelToken(Message.name),
                    useValue: {
                        create: jest.fn().mockResolvedValue(mockMessage),
                    },
                },
            ],
        }).compile();

        service = module.get<ChatService>(ChatService);
        messageModel = module.get<Model<Message>>(getModelToken(Message.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createMessage', () => {
        it('should send a message', async () => {
            const createMessageDto = {
                messageId: uuidv4(),
                conversationId: 'conv-12345',
                senderId: 'user1',
                content: 'Hello!',
                sentAt: new Date(),
            };

            const result = await service.createMessage(createMessageDto);

            expect(result).toEqual(mockMessage);
            expect(messageModel.create).toHaveBeenCalledWith(createMessageDto);
        });
    });
});
