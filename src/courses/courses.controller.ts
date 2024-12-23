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
    console.log('Authorization Header:', authHeader); // Debug

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token); // Debug

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      // Verify token but don't pass decoded payload to the service
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log('Decoded Token:', decodedToken); // Debug
      const userId = decodedToken.userId; // Use 'userId' from decoded token

      return this.courseService.enrollInCourse(courseId, userId); // Pass raw token
    } catch (err) {
      console.error('JWT Verification Error:', err); // Debug
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
    @Headers('authorization') authHeader: string, // Extract token from header
  ) {
    // Ensure Authorization header is provided
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const token = authHeader.split(' ')[1];
    // Ensure token is extracted
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      // Decode the token to extract instructor ID
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      console.log('Decoded Token:', decodedToken); // Debugging: Check decoded token structure

      const instructorId = decodedToken.userId; // Ensure this matches your JWT payload's field name

      if (!instructorId) {
        throw new UnauthorizedException('Instructor ID not found in token');
      }

      // Call the service to create the course
      const course = await this.courseService.createCourse(
        createCourseDto,
        instructorId,
      );

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Course created successfully',
        data: course,
      };
    } catch (err) {
      console.error('JWT Verification Error:', err); // Debugging: log any verification issues
      throw new UnauthorizedException('Invalid or expired token');
    }
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
