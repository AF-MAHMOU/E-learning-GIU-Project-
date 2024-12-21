import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    UseGuards,
    NotFoundException,
  } from '@nestjs/common';
  import { ForumsService } from './forums.service';
  import { CreateThreadDto } from './dto/create-thread.dto';
  import { CreateReplyDto } from './dto/create-reply.dto';
  import { RolesGuard } from '../common/guards/roles.guard';
  import { Roles } from '../common/decorators/roles.decorator';
  import { Role } from '../common/enums/role.enum';
  
  @Controller('forum')
  @UseGuards(RolesGuard)
  export class ForumsController {
    constructor(private readonly forumService: ForumsService) {}
  
    // Only admins and instructors can create threads
    @Post('threads')
    @Roles(Role.Admin, Role.Instructor)
    async createThread(@Body() createThreadDto: CreateThreadDto) {
      const { title, content, courseId, authorId } = createThreadDto;
  
      if (!title || !content || !courseId || !authorId) {
        throw new NotFoundException('Missing required fields.');
      }
  
      return this.forumService.createThread(createThreadDto);
    }
  
    // Anyone can create replies
    @Post('replies')
    @Roles(Role.Admin, Role.Instructor, Role.Student)
    async createReply(@Body() createReplyDto: CreateReplyDto) {
      const { threadId, content, authorId } = createReplyDto;
  
      if (!threadId || !content || !authorId) {
        throw new NotFoundException('Missing required fields.');
      }
  
      return this.forumService.createReply(createReplyDto);
    }
  
    // Get all threads for a specific course
    @Get('threads/:courseId')
    async getThreadsByCourse(@Param('courseId') courseId: string) {
      return this.forumService.getThreadsByCourse(courseId);
    }
  
    // Get all replies for a specific thread
    @Get('replies/:threadId')
    async getRepliesByThread(@Param('threadId') threadId: string) {
      return this.forumService.getRepliesByThread(threadId);
    }
  }
  