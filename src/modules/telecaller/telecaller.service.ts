import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TelecallerService {
  constructor(private prisma: PrismaService) {}

  async createLead(data: Prisma.LeadCreateInput) {
    return this.prisma.lead.create({
      data,
    });
  }

  async getLeads() {
    return this.prisma.lead.findMany({
      include: {
        followUps: {
          orderBy: { date: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getLeadById(id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: {
        followUps: {
          orderBy: { date: 'desc' },
        },
      },
    });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return lead;
  }

  async updateLeadStatus(id: string, status: string) {
    return this.prisma.lead.update({
      where: { id },
      data: { status },
    });
  }

  async addFollowUp(leadId: string, data: Omit<Prisma.FollowUpCreateInput, 'lead'>) {
    return this.prisma.followUp.create({
      data: {
        ...data,
        lead: { connect: { id: leadId } },
      },
    });
  }

  async deleteLead(id: string) {
    return this.prisma.lead.delete({
      where: { id },
    });
  }

  async bulkAssignLeads(leadIds: string[], assigneeId: string) {
    return this.prisma.lead.updateMany({
      where: { id: { in: leadIds } },
      data: { assignedTo: assigneeId },
    });
  }
}
