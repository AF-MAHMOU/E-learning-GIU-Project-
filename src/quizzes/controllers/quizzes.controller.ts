import { Controller, Post, Body, Get, Param, UseGuards, Delete, Patch } from '@nestjs/common';
import { QuizzesService } from '../services/quizzes.service';
import { Quiz } from '../schemas/quiz.schema';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { SubmitQuizDto } from '../dto/submit-quiz.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Instructor)
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.createQuiz(createQuizDto);
  }

  @Get('instructor/:instructorId/quizzes')
  @UseGuards(RolesGuard)
  @Roles(Role.Instructor)
  async getQuizzesByInstructor(@Param('instructorId') instructorId: string) {
    return this.quizzesService.getQuizzesByInstructor(instructorId);
  }

  @Get(':id')
  async getQuiz(@Param('id') quizId: string) {
    return this.quizzesService.getQuiz(quizId);
  }

  @Post('submit')
  @UseGuards(RolesGuard)
  @Roles(Role.Student)
  async submitQuiz(@Body() submitQuizDto: SubmitQuizDto) {
    return this.quizzesService.submitQuiz(submitQuizDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async getAllQuizzes() {
    return this.quizzesService.getAllQuizzes();
  }

  @Patch(':quizId')
  @UseGuards(RolesGuard)
  @Roles(Role.Instructor)
  async updateQuiz(@Param('quizId') quizId: string, @Body() updateData: Partial<Quiz>) {
    return this.quizzesService.updateQuiz(quizId, updateData);
  }

  @Delete(':quizId')
  @UseGuards(RolesGuard)
  @Roles(Role.Instructor)
  async deleteQuiz(@Param('quizId') quizId: string) {
    await this.quizzesService.deleteQuiz(quizId);
    return { message: 'Quiz deleted successfully' };
  }

}
