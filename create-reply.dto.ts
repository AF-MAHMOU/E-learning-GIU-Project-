import { Injectable } from '@nestjs/common';
import { ThreadService } from './create-thread.dto';

export class CreateReplyDto {
  threadId: string; 
  content: string; 
  authorId: string; 
}

@Injectable()
export class ReplyService {
  private replies = []; 

  constructor(private threadService: ThreadService) {}

  createReply(dto: CreateReplyDto) {
    const thread = this.threadService.getThreadById(dto.threadId);
    if (!thread) {
      throw new Error('Thread not found');
    }

    const newReply = {
      id: Date.now().toString(), 
      ...dto,
      createdAt: new Date(),
    };

    thread.replies.push(newReply);
    this.replies.push(newReply);
    return newReply;
  }
}
