import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Thread, ThreadDocument } from './schemas/thread.schema';
import { Reply, ReplyDocument } from './schemas/reply.schema';
import { CreateThreadDto } from './dto/create-thread.dto';
import { CreateReplyDto } from './dto/create-reply.dto';

@Injectable()
export class ForumsService {
  constructor(
    @InjectModel(Thread.name) private threadModel: Model<ThreadDocument>,
    @InjectModel(Reply.name) private replyModel: Model<ReplyDocument>,
  ) {}

  // Create a new thread
  async createThread(createThreadDto: CreateThreadDto): Promise<Thread> {
    const newThread = new this.threadModel({
      threadId: Date.now().toString(),
      ...createThreadDto,
    });

    return newThread.save();
  }

  // Create a new reply
  async createReply(createReplyDto: CreateReplyDto): Promise<Reply> {
    const thread = await this.threadModel.findOne({
      threadId: createReplyDto.threadId,
    });

    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    const newReply = new this.replyModel({
      replyId: Date.now().toString(),
      ...createReplyDto,
    });

    return newReply.save();
  }

  // Get threads by course ID
  async getThreadsByCourse(courseId: string): Promise<Thread[]> {
    return this.threadModel.find({ courseId }).exec();
  }

  // Get replies by thread ID
  async getRepliesByThread(threadId: string): Promise<Reply[]> {
    return this.replyModel.find({ threadId }).exec();
  }
}
