import { Controller, Post, Get, Param, Body, UseGuards, Delete, Patch } from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { Question } from '../schemas/question.schema';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('questions')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Post()
    @UseGuards(RolesGuard)
    @Roles(Role.Instructor)
    async create(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionService.create(createQuestionDto);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.questionService.findById(id);
    }
    
    @Get()
    async findAll() {
        return this.questionService.findAll();
    }

    @Patch(':questionBankId/questions/:questionId')
    @UseGuards(RolesGuard)
    @Roles(Role.Instructor)
    async updateQuestion(
        @Param('questionBankId') questionBankId: string,
        @Param('questionId') questionId: string,
        @Body() updatedQuestionData: Partial<Question>,
    ) {
        return this.questionService.updateQuestion(questionBankId, updatedQuestionData);
    }

    @Delete(':questionBankId/questions/:questionId')
    @UseGuards(RolesGuard)
    @Roles(Role.Instructor)
    async deleteQuestion(@Param('questionBankId') questionBankId: string, @Param('questionId') questionId: string) {
        await this.questionService.deleteQuestion(questionBankId, questionId);
        return { message: 'Question deleted successfully' };
    }

};
