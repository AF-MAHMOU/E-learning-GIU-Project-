import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from '../schemas/question.schema';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { QuestionBank, QuestionBankDocument } from '../schemas/questionBank.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(QuestionBank.name) private questionBankModel: Model<QuestionBankDocument>,
  ) {}

  // Create a new question
  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const createdQuestion = new this.questionModel(createQuestionDto);
    return createdQuestion.save();
  }

  // Find a question by ID
  async findById(id: string): Promise<Question | null> {
    return this.questionModel.findById(id).exec();
  }

  // Find all questions
  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  // Update a question
  async updateQuestion( questionId: string, updatedQuestionData: Partial<Question> ):
  Promise<Question> {
    const question = await this.questionModel.findById(questionId).exec();
    if (!question) throw new NotFoundException('Question not found');

    Object.assign(question, updatedQuestionData); // Update fields
    return question.save();
  }

  // Delete a question
  async deleteQuestion(questionBankId: string, questionId: string): Promise<QuestionBank> {
    const questionBank = await this.questionBankModel.findById(questionBankId).exec();
    if (!questionBank) throw new NotFoundException('Question bank not found');

    // Remove reference in `questionsByDifficulty`
    for (const group of questionBank.questionsByDifficulty) {
      const index = group.questions.findIndex(q => q === questionId);
      if (index !== -1) {
        group.questions.splice(index, 1); // Remove question reference
        break;
      }
    }

    await this.questionModel.findByIdAndDelete(questionId); // Delete the question document
    return questionBank.save();
  }
}
