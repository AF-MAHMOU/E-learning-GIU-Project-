import { IsOptional, IsString } from 'class-validator';

export class GetAnalyticsDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  courseId?: string;
}
