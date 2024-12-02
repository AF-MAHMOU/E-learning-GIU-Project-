import { IsArray, IsEnum, IsString, MinLength } from 'class-validator';

export class CreateQuizDto {
    @IsString()
    @MinLength(4)
    moduleId: string;

    @IsString()
    @MinLength(4)
    createdBy: string;

    @IsArray()
    @IsEnum(['MCQ', 'TrueFalse'], { each: true })
    questionTypes: string[];

    @IsArray()
    @IsString({ each: true })
    questions: string[];
}