import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlacementsService {
  constructor(private prisma: PrismaService) {}

  // --- Companies ---
  async createCompany(data: Prisma.CompanyCreateInput) {
    return this.prisma.company.create({ data });
  }

  async getCompanies() {
    return this.prisma.company.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async updateCompany(id: string, data: Prisma.CompanyUpdateInput) {
    return this.prisma.company.update({
      where: { id },
      data,
    });
  }

  async deleteCompany(id: string) {
    return this.prisma.company.delete({
      where: { id },
    });
  }

  // --- Placement Drives ---
  async createDrive(data: Prisma.PlacementDriveCreateInput) {
    return this.prisma.placementDrive.create({ data });
  }

  async getDrives() {
    return this.prisma.placementDrive.findMany({
      include: { company: true },
      orderBy: { date: 'desc' },
    });
  }

  async updateDrive(id: string, data: Prisma.PlacementDriveUpdateInput) {
    return this.prisma.placementDrive.update({
      where: { id },
      data,
    });
  }

  async deleteDrive(id: string) {
    return this.prisma.placementDrive.delete({
      where: { id },
    });
  }

  // --- Job Postings ---
  async createJobPosting(data: Prisma.JobPostingCreateInput) {
    return this.prisma.jobPosting.create({ data });
  }

  async getJobPostings(driveId?: string) {
    const where = driveId ? { driveId } : {};
    return this.prisma.jobPosting.findMany({
      where,
      include: {
        drive: {
          include: { company: true },
        },
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateJobPosting(id: string, data: Prisma.JobPostingUpdateInput) {
    return this.prisma.jobPosting.update({
      where: { id },
      data,
    });
  }

  async deleteJobPosting(id: string) {
    return this.prisma.jobPosting.delete({
      where: { id },
    });
  }

  // --- Applications ---
  async getApplications(jobId: string) {
    return this.prisma.jobApplication.findMany({
      where: { jobPostingId: jobId },
      include: { student: true },
    });
  }

  async updateApplicationStatus(id: string, status: string) {
    return this.prisma.jobApplication.update({
      where: { id },
      data: { status },
    });
  }
}
