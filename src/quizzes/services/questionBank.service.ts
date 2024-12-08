import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionBank, QuestionBankDocument } from '../schemas/questionBank.schema';
import { CreateQuestionBankDto } from '../dto/create-questionBank.dto';

@Injectable()
export class QuestionBankService {
  constructor(
    @InjectModel(QuestionBank.name) private questionBankModel: Model<QuestionBankDocument>,
  ) {}

  async create(createQuestionBankDto: CreateQuestionBankDto): Promise<QuestionBank> {
    const createdQuestionBank = new this.questionBankModel(createQuestionBankDto);
    return createdQuestionBank.save();
  }

  async getQuestionBanksByInstructor(instructorId: string): Promise<QuestionBank[]> {
    return this.questionBankModel.find({ createdBy: instructorId }).exec();
  }

  async updateQuestionBank(questionBankId: string, updateData: Partial<QuestionBank>): Promise<QuestionBank> {
    const updatedBank = await this.questionBankModel.findByIdAndUpdate(questionBankId, updateData, { new: true }).exec();
    if (!updatedBank) throw new NotFoundException('Question bank not found');
    return updatedBank;
  }
  
  async deleteQuestionBank(questionBankId: string): Promise<void> {
    const result = await this.questionBankModel.findByIdAndDelete(questionBankId).exec();
    if (!result) throw new NotFoundException('Question bank not found');
  }
  
}
