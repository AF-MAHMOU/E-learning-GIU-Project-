import { Injectable } from '@nestjs/common';

export class CreateThreadDto {
  title: string; 
  content: string; 
  courseId: string; 
  authorId: string; 
}

@Injectable()
export class ThreadService {
  private threads = [];

  createThread(dto: CreateThreadDto) {
    const newThread = {
      id: Date.now().toString(), 
      ...dto,
      createdAt: new Date(),
      replies: [],
    };
    this.threads.push(newThread);
    return newThread;
  }

  getThreadsByCourse(courseId: string) {
    return this.threads.filter((thread) => thread.courseId === courseId);
  }

  getThreadById(threadId: string) {
    return this.threads.find((thread) => thread.id === threadId);
  }
}
