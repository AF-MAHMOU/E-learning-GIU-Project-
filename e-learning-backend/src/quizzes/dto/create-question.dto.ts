import { IsArray, IsEnum, IsString, MinLength } from 'class-validator';

export class CreateQuestionDto {
    @IsString()
    @MinLength(4)
    quizId: string;

    @IsString()
    @MinLength(4)
    text: string;

    @IsArray()
    @IsString({ each: true })
    options: string[];

    @IsString()
    @MinLength(1)
    correctAnswer: string;

    @IsString()
    @IsEnum(['MCQ', 'TrueFalse'])
    type: string;
}