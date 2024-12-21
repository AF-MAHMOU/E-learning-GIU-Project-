import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('notifications')
@UseGuards(RolesGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Only admins or instructors can create notifications
  @Post()
  @Roles(Role.Admin, Role.Instructor)
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  // Admins, instructors, or students can view their notifications
  @Get()
  @Roles(Role.Admin, Role.Instructor, Role.Student)
  async findAll(@Query('userId') userId: string) {
    return this.notificationService.findAll(userId);
  }

  // Admins or the notification's owner can view a specific notification
  @Get(':id')
  @Roles(Role.Admin, Role.Instructor, Role.Student)
  async findOne(@Param('id') id: string) {
    return this.notificationService.findOne(id);
  }

  // Only admins can update notifications
  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(id, updateNotificationDto);
  }

  // Only admins can delete notifications
  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id') id: string) {
    return this.notificationService.delete(id);
  }
}
