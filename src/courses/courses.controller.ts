import {Controller, Get, Post, Body, Param, Query, UseGuards, HttpStatus, NotFoundException, Res} from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Response } from 'express';

@Controller('courses')
export class CoursesController {
    constructor(private readonly courseService: CourseService) {}

    // Student Endpoints
    @Get('search')
    async searchCourses(
        @Query('title') title: string,
        @Query('category') category: string,
        @Res() res: Response
    ) {
        try {
            // Ensure at least one filter is provided
            if (!title && !category) {
                return res
                    .status(HttpStatus.BAD_REQUEST)
                    .json({ message: 'At least one search filter (title or category) must be provided' });
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
    async enrollInCourse(@Body('courseId') courseId: string, @Body('userId') userId: string) {
        return this.courseService.enrollInCourse(courseId, userId);
    }

    @Get('progress/:userId')
    @UseGuards(RolesGuard)
    async getStudentProgress(@Param('userId') userId: string) {
        return this.courseService.getStudentProgress(userId);
    }

    // Instructor Endpoints
    @Post('create')
    @UseGuards(RolesGuard)
    async createCourse(@Body() createCourseDto: CreateCourseDto, @Body('instructorId') instructorId: string) {
        return this.courseService.createCourse(createCourseDto, instructorId);
    }

    @Post('module/create')
    @UseGuards(RolesGuard)
    async createModule(@Body() createModuleDto: CreateModuleDto, @Body('instructorId') instructorId: string) {
        return this.courseService.createModule(createModuleDto, instructorId);
    }

    @Post('update/:courseId')
    @UseGuards(RolesGuard)
    async updateCourse(@Param('courseId') courseId: string, @Body() updateData: Partial<CreateCourseDto>, @Body('instructorId') instructorId: string) {
        return this.courseService.updateCourse(courseId, updateData, instructorId);
    }

    // Admin Endpoints
    @Get()
    @UseGuards(RolesGuard)
    async getAllCourses() {
        return this.courseService.getAllCourses();
    }
}