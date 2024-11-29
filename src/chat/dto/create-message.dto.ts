import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDate, MinLength } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    messageId: string;

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
    sentAt?: Date; // Optional, defaults to current date if not provided
}
