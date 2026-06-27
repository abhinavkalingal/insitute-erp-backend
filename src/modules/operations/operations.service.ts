import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OperationsService {
  constructor(private prisma: PrismaService) {}

  async createTicket(data: Prisma.SupportTicketCreateInput) {
    return this.prisma.supportTicket.create({ data });
  }

  async getTickets() {
    return this.prisma.supportTicket.findMany({
      include: {
        raisedBy: {
          select: { id: true, firstName: true, lastName: true }
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateTicket(id: string, data: Prisma.SupportTicketUpdateInput) {
    return this.prisma.supportTicket.update({
      where: { id },
      data,
    });
  }

  async deleteTicket(id: string) {
    return this.prisma.supportTicket.delete({
      where: { id },
    });
  }
}
