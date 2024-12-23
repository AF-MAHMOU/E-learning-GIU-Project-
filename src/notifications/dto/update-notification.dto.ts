import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateNotificationDto {
    @IsString()
    @IsNotEmpty()
    message?: string;
  
    @IsBoolean()
    @IsOptional()
    read?: boolean;
  }
