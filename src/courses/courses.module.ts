import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { CourseService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course, CourseSchema } from './schemas/course.schema';
import { Module as CourseModule, ModuleSchema } from './schemas/module.schema';
import { Progress, ProgressSchema } from './schemas/progress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: CourseModule.name, schema: ModuleSchema },
      { name: Progress.name, schema: ProgressSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Replace with your secret key
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [CoursesController],
  providers: [CourseService],
  exports: [CourseService], // Export the service if needed in other modules
})
export class CoursesModule {}
