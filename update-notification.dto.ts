import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateNotificationDto {
    @IsString()
    @IsOptional()
    message?: string;
  
    @IsBoolean()
    @IsOptional()
    read?: boolean;
  }