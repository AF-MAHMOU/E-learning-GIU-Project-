import { 
  IsString, 
  IsNotEmpty, 
  IsArray, 
  ValidateNested, 
  IsEnum 
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionDifficulty } from './create-question.dto';

export class QuestionBankQuestionEntry {
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @IsEnum(QuestionDifficulty)
  difficulty: QuestionDifficulty;
}

export class CreateQuestionBankDto {
  @IsString()
  @IsNotEmpty()
  moduleId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionBankQuestionEntry)
  questions: QuestionBankQuestionEntry[];
}

export class UpdateQuestionBankDto {
  @IsString()
  @IsNotEmpty()
  questionBankId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionBankQuestionEntry)
  questions: QuestionBankQuestionEntry[];
}