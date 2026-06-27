import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { LeaveRequestsService } from './leave-requests.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from '@core/guards/permissions.guard';

@ApiTags('HR / Leave Requests')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('leave-requests')
export class LeaveRequestsController {
  constructor(private readonly leaveRequestsService: LeaveRequestsService) {}

  @Get()
  findAll() {
    return this.leaveRequestsService.findAll();
  }

  @Post()
  create(@Body() createDto: any) {
    return this.leaveRequestsService.create(createDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.leaveRequestsService.updateStatus(id, status);
  }
}
