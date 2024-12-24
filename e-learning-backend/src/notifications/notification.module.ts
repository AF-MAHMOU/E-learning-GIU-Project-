import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schemas/notification.schema';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({

    imports: [
        MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema },
            { name: NotificationModule.name, schema: NotificationSchema }
        ]),
      ],
      controllers: [NotificationController],
      providers: [NotificationService],
      exports: [NotificationService],

})
export class NotificationModule {}