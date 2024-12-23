import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
//awel 7aga ba3den controller ba3den service lastly el module
export class CreateConversationDto {
    @IsString()
    @IsNotEmpty()
    conversationId: string; // Unique identifier for the conversation

    @IsArray()
    @ArrayMinSize(2, { message: 'A conversation must have at least two participants.' })
    @IsString({ each: true })
    participants: string[]; // Array of participant IDs

    @IsString()
    @IsNotEmpty()
    createdBy: string; // ID of the user who created the conversation
}
