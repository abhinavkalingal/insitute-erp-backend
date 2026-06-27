import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReceptionService {
  constructor(private prisma: PrismaService) {}

  // --- Visitors ---
  async createVisitor(data: Prisma.VisitorCreateInput) {
    return this.prisma.visitor.create({ data });
  }

  async getVisitors() {
    return this.prisma.visitor.findMany({
      orderBy: { checkInAt: 'desc' },
    });
  }

  async updateVisitor(id: string, data: Prisma.VisitorUpdateInput) {
    return this.prisma.visitor.update({
      where: { id },
      data,
    });
  }

  async deleteVisitor(id: string) {
    return this.prisma.visitor.delete({
      where: { id },
    });
  }

  // --- Enquiries ---
  async createEnquiry(data: Prisma.EnquiryCreateInput) {
    return this.prisma.enquiry.create({ data });
  }

  async getEnquiries() {
    return this.prisma.enquiry.findMany({
      include: { course: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateEnquiry(id: string, data: Prisma.EnquiryUpdateInput) {
    return this.prisma.enquiry.update({
      where: { id },
      data,
    });
  }

  async deleteEnquiry(id: string) {
    return this.prisma.enquiry.delete({
      where: { id },
    });
  }

  // --- Appointments ---
  async createAppointment(data: Prisma.AppointmentCreateInput) {
    return this.prisma.appointment.create({ data });
  }

  async getAppointments() {
    return this.prisma.appointment.findMany({
      orderBy: { date: 'asc' },
    });
  }

  async updateAppointment(id: string, data: Prisma.AppointmentUpdateInput) {
    return this.prisma.appointment.update({
      where: { id },
      data,
    });
  }

  async deleteAppointment(id: string) {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
