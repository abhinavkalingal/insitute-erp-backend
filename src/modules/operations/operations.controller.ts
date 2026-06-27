import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { Prisma } from '@prisma/client';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post('support-tickets')
  createTicket(@Body() data: Prisma.SupportTicketCreateInput) {
    return this.operationsService.createTicket(data);
  }

  @Get('support-tickets')
  getTickets() {
    return this.operationsService.getTickets();
  }

  @Patch('support-tickets/:id')
  updateTicket(@Param('id') id: string, @Body() data: Prisma.SupportTicketUpdateInput) {
    return this.operationsService.updateTicket(id, data);
  }

  @Delete('support-tickets/:id')
  deleteTicket(@Param('id') id: string) {
    return this.operationsService.deleteTicket(id);
  }
}
