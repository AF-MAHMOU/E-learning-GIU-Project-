import { 
    IsString, 
    IsNotEmpty, 
    IsArray, 
    IsEnum, 
    ValidateNested, 
    ArrayMinSize, 
    IsBoolean 
} from 'class-validator';
  
export enum QuestionType {
    MCQ = 'MCQ',
    TRUE_OR_FALSE = 'TRUE_OR_FALSE'
}

export enum QuestionDifficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    questionBankId: string;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsEnum(QuestionType)
    type: QuestionType;

    @IsEnum(QuestionDifficulty)
    difficulty: QuestionDifficulty;

    @IsArray()
    @ArrayMinSize(2)
    @ValidateNested({ each: true })
    options: QuestionOption[];

    @IsString()
    @IsNotEmpty()
    correctAnswer: string;
    }

    export class QuestionOption {
    @IsString()
    @IsNotEmpty()
    text: string;

    @IsBoolean()
    isCorrect: boolean;
}