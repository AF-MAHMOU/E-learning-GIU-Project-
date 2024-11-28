import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    @IsEnum(['student', 'instructor', 'admin'])
    role: string;

    @IsOptional()
    @IsString()
    profile_picture_url?: string;
}