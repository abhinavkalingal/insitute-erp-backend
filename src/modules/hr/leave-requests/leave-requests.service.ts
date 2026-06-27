import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';

@Injectable()
export class LeaveRequestsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.leaveRequest.findMany({
      include: {
        staff: {
          include: { user: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(data: any) {
    return this.prisma.leaveRequest.create({
      data: {
        staffId: data.staffId,
        type: data.type,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        reason: data.reason,
        status: data.status || 'PENDING'
      }
    });
  }

  async updateStatus(id: string, status: string) {
    const leaveRequest = await this.prisma.leaveRequest.findUnique({ where: { id } });
    if (!leaveRequest) throw new NotFoundException('Leave request not found');
    
    return this.prisma.leaveRequest.update({
      where: { id },
      data: { status }
    });
  }
}
