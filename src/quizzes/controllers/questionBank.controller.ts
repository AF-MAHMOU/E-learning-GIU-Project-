import { Controller, Post, Body, Get, Param, UseGuards, Delete, Patch } from '@nestjs/common';
import { QuestionBankService } from '../services/questionBank.service';
import { CreateQuestionBankDto } from '../dto/create-questionBank.dto';
import { QuestionBank } from '../schemas/questionBank.schema';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('question-banks')
export class QuestionBankController {
  constructor(private readonly questionBankService: QuestionBankService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Instructor)
  async create(@Body() createQuestionBankDto: CreateQuestionBankDto) {
    return this.questionBankService.create(createQuestionBankDto);
  }

  @Get('instructor/:instructorId/question-banks')
  @UseGuards(RolesGuard)
  @Roles(Role.Instructor)
  async getQuestionBanksByInstructor(@Param('instructorId') instructorId: string) {
    return this.questionBankService.getQuestionBanksByInstructor(instructorId);
  }

  @Patch(':questionBankId')
  @UseGuards(RolesGuard)
  @Roles(Role.Instructor)
  async updateQuestionBank(@Param('questionBankId') questionBankId: string, @Body() updateData: Partial<QuestionBank>) {
    return this.questionBankService.updateQuestionBank(questionBankId, updateData);
  }

  @Delete(':questionBankId')
  @UseGuards(RolesGuard)
  @Roles(Role.Instructor)
  async deleteQuestionBank(@Param('questionBankId') questionBankId: string) {
    await this.questionBankService.deleteQuestionBank(questionBankId);
    return { message: 'Question bank deleted successfully' };
  }
}
