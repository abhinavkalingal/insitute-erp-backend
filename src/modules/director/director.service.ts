import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DirectorService {
  constructor(private prisma: PrismaService) {}

  async createApproval(data: Prisma.ApprovalRequestCreateInput) {
    return this.prisma.approvalRequest.create({ data });
  }

  async getApprovals() {
    return this.prisma.approvalRequest.findMany({
      include: {
        requester: {
          select: { id: true, firstName: true, lastName: true }
        },
        approver: {
          select: { id: true, firstName: true, lastName: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateApproval(id: string, data: Prisma.ApprovalRequestUpdateInput) {
    return this.prisma.approvalRequest.update({
      where: { id },
      data,
    });
  }

  async deleteApproval(id: string) {
    return this.prisma.approvalRequest.delete({
      where: { id },
    });
  }
}
