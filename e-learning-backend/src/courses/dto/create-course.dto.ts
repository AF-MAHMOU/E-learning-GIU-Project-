import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsEnum(['Beginner', 'Intermediate', 'Advanced'])
    difficulty: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    createdBy: string;
}