import { Controller, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';

import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notifications for the current user' })
  @ApiQuery({ name: 'unreadOnly', required: false, type: Boolean })
  findAll(@Req() req: Request, @Query('unreadOnly') unreadOnly?: string) {
    const userId = (req.user as any).sub || (req.user as any).id;
    const isUnreadOnly = unreadOnly === 'true';
    return this.notificationsService.findAllForUser(userId, isUnreadOnly);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a specific notification as read' })
  markAsRead(@Param('id') id: string, @Req() req: Request) {
    const userId = (req.user as any).sub || (req.user as any).id;
    return this.notificationsService.markAsRead(id, userId);
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Mark all unread notifications as read' })
  markAllAsRead(@Req() req: Request) {
    const userId = (req.user as any).sub || (req.user as any).id;
    return this.notificationsService.markAllAsRead(userId);
  }
}
