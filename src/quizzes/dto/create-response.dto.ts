import { IsArray, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateResponseDto {
    @IsString()
    @MinLength(4)
    userId: string;

    @IsString()
    @MinLength(4)
    quizId: string;

    @IsArray()
    answers: Record<string, any>[];

    @IsNumber()
    score: number;
}