import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  notificationId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsBoolean()
  @IsOptional()
  read?: boolean;
}

