import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { Module, ModuleDocument } from './schemas/module.schema';
import { Progress, ProgressDocument } from './schemas/progress.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CourseService {
    constructor(
        @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
        @InjectModel(Module.name) private moduleModel: Model<ModuleDocument>,
        @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>
    ) {}

    // Student Services
    // Not working.
    async searchCourses(filters: any) {
        // Build the query directly from valid filters
        const searchQuery: any = {};
        if (filters.title) {
            searchQuery['title'] = { $regex: new RegExp(filters.title, 'i') };
        }
        if (filters.category) {
            searchQuery['category'] = { $regex: new RegExp(filters.category, 'i') };
        }
    
        // Execute the query
        const courses = await this.courseModel.find(searchQuery).exec();
    
        // Handle no results found
        if (!courses || courses.length === 0) {
            throw new NotFoundException('No courses found matching the search criteria');
        }
    
        return courses;
    }
    

    async enrollInCourse(courseId: string, userId: string) {
        const course = await this.courseModel.findById(courseId);
        if (!course) throw new NotFoundException('Course not found');

        const progress = new this.progressModel({
            progressId: uuidv4(),
            userId,
            courseId,
            completionPercentage: 0,
            lastAccessed: new Date()
        });

        return progress.save();
    }

    async getStudentProgress(userId: string) {
        return this.progressModel.find({ userId });
    }

    // Instructor Services
    async createCourse(courseData: Partial<Course>, instructorId: string) {
        const course = new this.courseModel({
            ...courseData,
            id: uuidv4(),
            createdBy: instructorId
        });
        return course.save();
    }

    async createModule(moduleData: Partial<Module>, instructorId: string) {
        const course = await this.courseModel.findOne({
            courseId: moduleData.courseId,
            createdBy: instructorId
        });

        if (!course) throw new ForbiddenException('Not authorized to modify this course');

        const module = new this.moduleModel({
            ...moduleData,
            moduleId: uuidv4()
        });
        return module.save();
    }

    async updateCourse(courseId: string, updateData: Partial<Course>, instructorId: string) {
        const course = await this.courseModel.findOne({ id: courseId, createdBy: instructorId });
        if (!course) throw new ForbiddenException('Not authorized to modify this course');

        return this.courseModel.findOneAndUpdate(
            { id: courseId },
            { $set: updateData },
            { new: true }
        );
    }

    // Admin Services
    async getAllCourses() {
        return this.courseModel.find();
    }

    // DO NOT IMPLEMENT
    // async archiveCourse(courseId: string) {
    //     // Implementation would depend on how you want to handle archiving
    //     // Could be a soft delete, moving to separate collection, etc.
    //     return this.courseModel.findOneAndUpdate(
    //         { id: courseId },
    //         { $set: { status: 'archived' } },
    //         { new: true }
    //     );
    // }
}
