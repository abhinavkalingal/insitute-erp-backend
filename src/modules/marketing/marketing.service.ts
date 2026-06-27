import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MarketingService {
  constructor(private prisma: PrismaService) {}

  async createCampaign(data: Prisma.CampaignCreateInput) {
    return this.prisma.campaign.create({ data });
  }

  async getCampaigns() {
    return this.prisma.campaign.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateCampaign(id: string, data: Prisma.CampaignUpdateInput) {
    return this.prisma.campaign.update({
      where: { id },
      data,
    });
  }

  async deleteCampaign(id: string) {
    return this.prisma.campaign.delete({
      where: { id },
    });
  }

  // --- Leads ---
  async createLead(data: Prisma.LeadCreateInput) {
    return this.prisma.lead.create({ data });
  }

  async getLeads() {
    return this.prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateLead(id: string, data: Prisma.LeadUpdateInput) {
    return this.prisma.lead.update({
      where: { id },
      data,
    });
  }
}
