import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  Res,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Response } from 'express';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly courseService: CourseService,
    private readonly jwtService: JwtService,
  ) {}

  // Student Endpoints
  @Get('search')
  async searchCourses(
    @Query('title') title: string,
    @Query('category') category: string,
    @Res() res: Response,
  ) {
    try {
      // Ensure at least one filter is provided
      if (!title && !category) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message:
            'At least one search filter (title or category) must be provided',
        });
      }

      // Construct filters
      const filters: any = {};
      if (title) filters['title'] = { $regex: new RegExp(title, 'i') };
      if (category) filters['category'] = { $regex: new RegExp(category, 'i') };

      console.log('Filters:', filters); // Debug: Log filters

      // Search courses
      const courses = await this.courseService.searchCourses(filters);

      console.log('Courses found:', courses); // Debug: Log found courses

      // Handle no results
      if (!courses || courses.length === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'No courses found matching the search criteria' });
      }

      // Return found courses
      return res.status(HttpStatus.OK).json(courses);
    } catch (error) {
      console.error('Error occurred:', error); // Debug: Log unexpected errors
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }

  @Post('enroll')
  @UseGuards(RolesGuard)
  @Roles(Role.Student)
  async enrollInCourse(
    @Body('courseId') courseId: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return this.courseService.enrollInCourse(courseId, decodedToken);
    } catch (err) {
      throw new UnauthorizedException('Invalid token', err);
    }
  }

  @Get('progress/:userId')
  @UseGuards(RolesGuard)
  @Roles(Role.Student)
  async getStudentProgress(@Param('userId') userId: string) {
    return this.courseService.getStudentProgress(userId);
  }

  // Instructor Endpoints
  @Post('create')
  @UseGuards(RolesGuard)
  @Roles(Role.Instructor)
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @Body('instructorId') instructorId: string,
  ) {
    return this.courseService.createCourse(createCourseDto, instructorId);
  }

  @Post('module/create')
  @UseGuards(RolesGuard)
  @Roles(Role.Instructor)
  async createModule(
    @Body() createModuleDto: CreateModuleDto,
    @Body('instructorId') instructorId: string,
  ) {
    return this.courseService.createModule(createModuleDto, instructorId);
  }

  @Post('update/:courseId')
  @UseGuards(RolesGuard)
  @Roles(Role.Instructor)
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() updateData: Partial<CreateCourseDto>,
    @Body('instructorId') instructorId: string,
  ) {
    return this.courseService.updateCourse(courseId, updateData, instructorId);
  }

  // Admin Endpoints
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async getAllCourses() {
    return this.courseService.getAllCourses();
  }
}
