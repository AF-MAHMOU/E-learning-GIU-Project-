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
      if (!title && !category) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'At least one search filter (title or category) must be provided',
        });
      }

      const filters: any = {};
      if (title) filters['title'] = { $regex: new RegExp(title, 'i') };
      if (category) filters['category'] = { $regex: new RegExp(category, 'i') };

      const courses = await this.courseService.searchCourses(filters);

      if (!courses || courses.length === 0) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'No courses found matching the search criteria' });
      }

      return res.status(HttpStatus.OK).json(courses);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  @Post('enroll')
  @UseGuards(RolesGuard)
  @Roles(Role.Student)
  async enrollInCourse(
    @Body('courseId') courseId: string,
    @Headers('authorization') authHeader: string,
  ) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedToken.userId;

      return this.courseService.enrollInCourse(courseId, userId);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
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
    @Headers('authorization') authHeader: string,
  ) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const instructorId = decodedToken.userId;

      const course = await this.courseService.createCourse(createCourseDto, instructorId);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Course created successfully',
        data: course,
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  @Post('module/create')
  @UseGuards(RolesGuard)
  @Roles(Role.Instructor)
  async createModule(
    @Body() createModuleDto: CreateModuleDto,
    @Headers('authorization') authHeader: string,
  ) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const instructorId = decodedToken.userId;

      return this.courseService.createModule(createModuleDto, instructorId);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  @Post('update/:courseId')
  @UseGuards(RolesGuard)
  @Roles(Role.Instructor)
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() updateData: Partial<CreateCourseDto>,
    @Headers('authorization') authHeader: string,
  ) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const instructorId = decodedToken.userId;

      return this.courseService.updateCourse(courseId, updateData, instructorId);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  // Admin Endpoints
  @Get()
  async getAllCourses(@Res() res: Response) {
    try {
      const courses = await this.courseService.getAllCourses();
      return res.status(HttpStatus.OK).json(courses);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Could not fetch courses' });
    }
  }
}
