import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReceptionService } from './reception.service';
import { Prisma } from '@prisma/client';

@Controller('reception')
export class ReceptionController {
  constructor(private readonly receptionService: ReceptionService) {}

  // --- Visitors ---
  @Post('visitors')
  createVisitor(@Body() data: Prisma.VisitorCreateInput) {
    return this.receptionService.createVisitor(data);
  }

  @Get('visitors')
  getVisitors() {
    return this.receptionService.getVisitors();
  }

  @Patch('visitors/:id')
  updateVisitor(@Param('id') id: string, @Body() data: Prisma.VisitorUpdateInput) {
    return this.receptionService.updateVisitor(id, data);
  }

  @Delete('visitors/:id')
  deleteVisitor(@Param('id') id: string) {
    return this.receptionService.deleteVisitor(id);
  }

  // --- Enquiries ---
  @Post('enquiries')
  createEnquiry(@Body() data: Prisma.EnquiryCreateInput) {
    return this.receptionService.createEnquiry(data);
  }

  @Get('enquiries')
  getEnquiries() {
    return this.receptionService.getEnquiries();
  }

  @Patch('enquiries/:id')
  updateEnquiry(@Param('id') id: string, @Body() data: Prisma.EnquiryUpdateInput) {
    return this.receptionService.updateEnquiry(id, data);
  }

  @Delete('enquiries/:id')
  deleteEnquiry(@Param('id') id: string) {
    return this.receptionService.deleteEnquiry(id);
  }

  // --- Appointments ---
  @Post('appointments')
  createAppointment(@Body() data: Prisma.AppointmentCreateInput) {
    return this.receptionService.createAppointment(data);
  }

  @Get('appointments')
  getAppointments() {
    return this.receptionService.getAppointments();
  }

  @Patch('appointments/:id')
  updateAppointment(@Param('id') id: string, @Body() data: Prisma.AppointmentUpdateInput) {
    return this.receptionService.updateAppointment(id, data);
  }

  @Delete('appointments/:id')
  deleteAppointment(@Param('id') id: string) {
    return this.receptionService.deleteAppointment(id);
  }
}
