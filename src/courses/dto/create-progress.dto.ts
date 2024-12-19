import {IsNotEmpty, IsNumber, IsString, MinLength} from 'class-validator';

export class CreateProgressDto {
    @IsString()
    @MinLength(4)
    userId: string;

    @IsString()
    @MinLength(4)
    courseId: string;

    @IsNumber()
    @IsNotEmpty()
    completionPercentage: number;
}