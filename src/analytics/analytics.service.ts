import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress } from './schemas/progress.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<Progress>,
  ) {}

  async getStudentAnalytics(userId: string) {
    return this.progressModel.find({ userId }).exec();
  }

  async getInstructorAnalytics(courseId: string) {
    return this.progressModel.find({ courseId }).exec();
  }
}
