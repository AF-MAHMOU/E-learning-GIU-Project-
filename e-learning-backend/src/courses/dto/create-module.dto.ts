import {IsString, IsNotEmpty, IsOptional, IsArray, IsEnum} from 'class-validator';

export class CreateModuleDto {
    @IsString()
    @IsNotEmpty()
    moduleId: string;

    @IsString()
    @IsNotEmpty()
    courseId: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsEnum(['Easy', 'Medium', 'Hard'])
    difficulty: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    resources?: string[];
}