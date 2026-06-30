import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RepairTicketsService {
  constructor(private prisma: PrismaService) {}

  async createTicket(data: Prisma.RepairTicketCreateInput) {
    return this.prisma.repairTicket.create({
      data: {
        ...data,
        logs: {
          create: {
            statusUpdate: 'RECEIVED',
            notes: 'Device received from customer',
            createdBy: 'SYSTEM',
          }
        }
      },
      include: { logs: true }
    });
  }

  async getTickets() {
    return this.prisma.repairTicket.findMany({
      include: { logs: { orderBy: { createdAt: 'desc' } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getTicketById(id: string) {
    const ticket = await this.prisma.repairTicket.findUnique({
      where: { id },
      include: { logs: { orderBy: { createdAt: 'desc' } } }
    });
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

  async updateTicketStatus(id: string, status: string, notes: string, userId: string) {
    return this.prisma.repairTicket.update({
      where: { id },
      data: {
        status,
        logs: {
          create: {
            statusUpdate: status,
            notes,
            createdBy: userId,
          }
        }
      },
      include: { logs: { orderBy: { createdAt: 'desc' } } }
    });
  }

  async updateTicket(id: string, data: Prisma.RepairTicketUpdateInput) {
    return this.prisma.repairTicket.update({
      where: { id },
      data,
      include: { logs: true }
    });
  }

  async deleteTicket(id: string) {
    return this.prisma.repairTicket.delete({ where: { id } });
  }
}
