import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { GetAnalyticsDto } from './dto/get-analytics.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('analytics')
@UseGuards(RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('student')
  @Roles(Role.Student)
  getStudentAnalytics(@Query('userId') userId: string) {
    return this.analyticsService.getStudentAnalytics(userId);
  } 

  @Get('instructor')
  @Roles(Role.Instructor)
  getInstructorAnalytics(@Query('courseId') courseId: string) {
    return this.analyticsService.getInstructorAnalytics(courseId);
  }
}
