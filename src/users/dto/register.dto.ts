// register.dto.ts
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;  // Raw password, will be hashed later

  @IsString()
  @IsEnum(['student', 'instructor', 'admin'])
  role: string;

  @IsOptional()
  @IsString()
  profile_picture_url?: string;
}
