import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Prisma } from '@prisma/client';
import { StudentsService } from '../students/students.service';

@Injectable()
export class MarketingService {
  constructor(
    private prisma: PrismaService,
    private studentsService: StudentsService,
  ) {}

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

  async convertLeadToStudent(id: string, data: any) {
    const lead = await this.prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      throw new Error('Lead not found');
    }

    // Use StudentsService to create the student
    const studentData = {
      firstName: lead.firstName,
      lastName: lead.lastName || '',
      email: lead.email || `${lead.firstName.toLowerCase()}.${Date.now()}@institute.com`,
      password: 'password123', // Default password
      branchId: data.branchId,
      courseId: data.courseId,
      batchId: data.batchId,
      admissionDate: new Date().toISOString(),
      profile: {
        phone: lead.phone,
        convertedFromLeadId: lead.id,
      },
    };

    const student = await this.studentsService.create(studentData as any);

    // Update lead status
    await this.prisma.lead.update({
      where: { id },
      data: { status: 'ENROLLED' },
    });

    return student;
  }
}
