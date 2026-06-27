import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DirectorService } from './director.service';
import { Prisma } from '@prisma/client';

@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Post('approvals')
  createApproval(@Body() data: Prisma.ApprovalRequestCreateInput) {
    return this.directorService.createApproval(data);
  }

  @Get('approvals')
  getApprovals() {
    return this.directorService.getApprovals();
  }

  @Patch('approvals/:id')
  updateApproval(@Param('id') id: string, @Body() data: Prisma.ApprovalRequestUpdateInput) {
    return this.directorService.updateApproval(id, data);
  }

  @Delete('approvals/:id')
  deleteApproval(@Param('id') id: string) {
    return this.directorService.deleteApproval(id);
  }
}
