import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateModuleDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    courseId: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    resources?: string[];
}