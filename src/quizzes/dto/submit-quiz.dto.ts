import { 
  IsString, 
  IsNotEmpty, 
  IsArray, 
  ValidateNested 
} from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerSubmission {
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @IsArray()
  selectedOptions: string[];
}

export class SubmitQuizDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  quizId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerSubmission)
  answers: AnswerSubmission[];
}