import { IsString, IsNotEmpty, IsOptional, MinLength, IsDate } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    messageId: string; // This is required!

    @IsString()
    @IsNotEmpty()
    conversationId: string;

    @IsString()
    @IsNotEmpty()
    senderId: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1, { message: 'Message content cannot be empty.' })
    content: string;

    @IsDate()
    @IsOptional()
    sentAt?: Date; // Optional, default value will be set if not provided
}
