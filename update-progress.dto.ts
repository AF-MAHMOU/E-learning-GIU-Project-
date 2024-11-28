import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateProgressDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  progressId: string;

  @IsNumber()
  @IsNotEmpty()
  completionPercentage: number;
}
