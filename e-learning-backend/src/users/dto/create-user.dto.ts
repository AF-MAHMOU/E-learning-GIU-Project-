import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @IsEnum(['student', 'instructor', 'admin'])
    role: string;

    @IsOptional()
    @IsString()
    profile_picture_url?: string;
}