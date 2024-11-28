import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProgressDto } from './courses/dto/create-progress.dto';
import { UpdateProgressDto } from './courses/dto/update-progress.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Create a new progress
  @Post('create')
  async createProgress(@Body() createProgressDto: CreateProgressDto) {
    return this.createProgressDto.createProgress(
      createProgressDto.userId,
      createProgressDto.courseId,
      createProgressDto.progressId,
    );

  }

  // Update the progress
  @Patch('update')
  async updateProgress(@Body() updateProgressDto: UpdateProgressDto) {
    return this.updateProgressDto.updateProgress(
      updateProgressDto.userId,
      updateProgressDto.courseId,
      updateProgressDto.completionPercentage,
    );
  }

    // Complete or Finish the course
    @Patch('complete')
    async completeCourse(@Body() updateProgressDto: UpdateProgressDto) {
      return this.updateProgressDto.completeCourse(
        updateProgressDto.userId,
        updateProgressDto.courseId,
      );
    }

    // Get the progress of a course
    @Get(':userId/:courseId')
    async getProgress(
      @Param('userId') userId: string,
      @Param('courseId') courseId: string,
    ) {
      return this.getProgress(userId, courseId);
    }
}
