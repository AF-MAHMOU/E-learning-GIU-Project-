import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProgressDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  progressId: string;
}
