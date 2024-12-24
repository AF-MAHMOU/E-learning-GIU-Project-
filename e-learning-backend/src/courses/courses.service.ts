import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { Module, ModuleDocument } from './schemas/module.schema';
import { Progress, ProgressDocument } from './schemas/progress.schema';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Module.name) private moduleModel: Model<ModuleDocument>,
    @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
    private jwtService: JwtService,
  ) {}

  // ====================
  //    Student Methods
  // ====================
  async searchCourses(filters: any) {
    const searchQuery: any = {};
    if (filters.title) {
      searchQuery['title'] = { $regex: new RegExp(filters.title, 'i') };
    }
    if (filters.category) {
      searchQuery['category'] = { $regex: new RegExp(filters.category, 'i') };
    }

    const courses = await this.courseModel.find(searchQuery).exec();
    if (!courses || courses.length === 0) {
      throw new NotFoundException('No courses found matching the search criteria');
    }

    return courses;
  }

  async enrollInCourse(courseId: string, userId: string) {
    // If your 'id' field is the unique identifier, you might need findOne({ id: courseId })
    // but here you're using findById, which corresponds to MongoDB _id
    const course = await this.courseModel.findById(courseId);
    if (!course) throw new NotFoundException('Course not found');

    const progress = new this.progressModel({
      progressId: uuidv4(),
      userId,
      courseId,
      completionPercentage: 0,
      lastAccessed: new Date(),
    });

    return progress.save();
  }

  async getStudentProgress(userId: string) {
    return this.progressModel.find({ userId });
  }

  // Return one course if we store the random UUID in the "id" field
  async getCourseById(courseId: string): Promise<Course | null> {
    return this.courseModel.findOne({ id: courseId }).exec();
  }

  // =====================
  //   Instructor Methods
  // =====================
  async createCourse(courseData: Partial<Course>, instructorId: string) {
    try {
      // We store a random UUID in the 'id' property
      const course = new this.courseModel({
        ...courseData,
        id: uuidv4(),
        createdBy: instructorId,
      });

      return course.save();
    } catch (err) {
      throw new Error('Error creating course');
    }
  }

  async createModule(moduleData: Partial<Module>, instructorId: string) {
    // We assume the moduleData.courseId corresponds to the 'id' field in the course schema
    const course = await this.courseModel.findOne({
      id: moduleData.courseId,
      createdBy: instructorId,
    });

    if (!course) {
      throw new ForbiddenException('Not authorized to modify this course');
    }

    const module = new this.moduleModel({
      ...moduleData,
      moduleId: uuidv4(),
    });
    return module.save();
  }

  async updateCourse(courseId: string, updateData: Partial<Course>, instructorId: string) {
    // Find a course whose 'id' is courseId and 'createdBy' is the instructor
    const course = await this.courseModel.findOne({
      id: courseId,
      createdBy: instructorId,
    });

    if (!course) {
      throw new ForbiddenException('Not authorized to modify this course');
    }

    // Update the course
    return this.courseModel.findOneAndUpdate(
      { id: courseId },
      { $set: updateData },
      { new: true },
    );
  }

  // =====================
  //     Admin Methods
  // =====================
  async getAllCourses() {
    return this.courseModel.find().exec();
  }

  async deleteCourse(courseId: string, userId: string, userRole: string) {
    // If user is admin, they can delete any course
    // If user is instructor, only delete if the 'createdBy' matches userId
    const query = userRole === 'admin'
      ? { id: courseId } // or _id if you store it that way
      : { id: courseId, createdBy: userId };
  
    const course = await this.courseModel.findOneAndDelete(query).exec();
    if (!course) {
      throw new ForbiddenException('Not authorized to delete or course not found');
    }
  
    return { message: 'Course deleted successfully' };
  }
  async getCoursesByInstructor(instructorId: string) {
    return this.courseModel.find({ createdBy: instructorId }).exec();
  }


  async getEnrolledCourses(studentId: string) {
    const courses = await this.courseModel.find({ enrolledStudents: studentId }).exec();
    if (!courses || courses.length === 0) {
      throw new NotFoundException('No enrolled courses found');
    }
    return courses;
  }
}
