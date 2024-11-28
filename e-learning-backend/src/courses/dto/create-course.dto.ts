import {IsString, IsNotEmpty, IsEnum, MinLength} from 'class-validator';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    description: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(['Beginner', 'Intermediate', 'Advanced'])
    difficulty: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    createdBy: string;
}