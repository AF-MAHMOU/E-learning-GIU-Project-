import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForumsController } from './forums.controller';
import { Thread, ThreadSchema } from './schemas/thread.schema';
import { ForumsService } from './forums.service';
import { Reply, ReplySchema } from './schemas/reply.schema';
import { RolesGuard } from '../common/guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Thread.name, schema: ThreadSchema },
      { name: Reply.name, schema: ReplySchema },
    ]),
  ],
  controllers: [ForumsController],
  providers: [ForumsService, RolesGuard],
})
export class ForumModule {}
