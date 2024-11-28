import { IsArray, IsString, MinLength } from 'class-validator';

export class SubmitQuizDto {
    @IsString()
    @MinLength(4)
    userId: string;

    @IsString()
    @MinLength(4)
    quizId: string;

    @IsArray()
    answers: Record<string, any>[];
}