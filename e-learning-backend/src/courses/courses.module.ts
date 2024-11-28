import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
    ],
    controllers: [CoursesController],
    providers: [CourseService],
    exports: [CourseService], // Export the service if needed in other modules
})
export class CoursesModule {}