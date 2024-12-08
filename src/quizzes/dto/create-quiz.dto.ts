import { 
    IsString, 
    IsNotEmpty, 
    IsArray, 
    IsEnum, 
    ValidateNested, 
    IsNumber, 
    Min 
} from 'class-validator';
import { Type } from 'class-transformer';

export enum QuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export class QuestionSelectionCriteria {
  @IsEnum(QuestionDifficulty)
  difficulty: QuestionDifficulty;

  @IsNumber()
  @Min(1)
  numberOfQuestions: number;
}

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  moduleId: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionSelectionCriteria)
  questionSelectionCriteria: QuestionSelectionCriteria[];

  @IsString()
  @IsEnum(['MCQ', 'MULTIPLE_CHOICE'])
  quizType: string;
}