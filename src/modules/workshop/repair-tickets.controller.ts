import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepairTicketsService } from './repair-tickets.service';
import { Prisma } from '@prisma/client';

@Controller('workshop/repair-tickets')
export class RepairTicketsController {
  constructor(private readonly repairTicketsService: RepairTicketsService) {}

  @Post()
  createTicket(@Body() data: Prisma.RepairTicketCreateInput) {
    return this.repairTicketsService.createTicket(data);
  }

  @Get()
  getTickets() {
    return this.repairTicketsService.getTickets();
  }

  @Get(':id')
  getTicketById(@Param('id') id: string) {
    return this.repairTicketsService.getTicketById(id);
  }

  @Patch(':id/status')
  updateTicketStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('notes') notes: string,
    @Body('userId') userId: string,
  ) {
    return this.repairTicketsService.updateTicketStatus(id, status, notes, userId);
  }

  @Patch(':id')
  updateTicket(@Param('id') id: string, @Body() data: Prisma.RepairTicketUpdateInput) {
    return this.repairTicketsService.updateTicket(id, data);
  }

  @Delete(':id')
  deleteTicket(@Param('id') id: string) {
    return this.repairTicketsService.deleteTicket(id);
  }
}
