import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TelecallerService } from './telecaller.service';
import { Prisma } from '@prisma/client';

@Controller('telecaller')
export class TelecallerController {
  constructor(private readonly telecallerService: TelecallerService) {}

  @Post('leads')
  createLead(@Body() data: Prisma.LeadCreateInput) {
    return this.telecallerService.createLead(data);
  }

  @Get('leads')
  getLeads() {
    return this.telecallerService.getLeads();
  }

  @Get('leads/:id')
  getLeadById(@Param('id') id: string) {
    return this.telecallerService.getLeadById(id);
  }

  @Patch('leads/:id/status')
  updateLeadStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.telecallerService.updateLeadStatus(id, status);
  }

  @Post('leads/:id/follow-ups')
  addFollowUp(@Param('id') id: string, @Body() data: Omit<Prisma.FollowUpCreateInput, 'lead'>) {
    return this.telecallerService.addFollowUp(id, data);
  }

  @Delete('leads/:id')
  deleteLead(@Param('id') id: string) {
    return this.telecallerService.deleteLead(id);
  }

  @Patch('leads/bulk-assign')
  bulkAssignLeads(@Body('leadIds') leadIds: string[], @Body('assigneeId') assigneeId: string) {
    return this.telecallerService.bulkAssignLeads(leadIds, assigneeId);
  }
}
