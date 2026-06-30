import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ToolsService {
  constructor(private prisma: PrismaService) {}

  async createTool(data: Prisma.ToolAssetCreateInput) {
    return this.prisma.toolAsset.create({ data });
  }

  async getTools() {
    return this.prisma.toolAsset.findMany({
      include: {
        issuances: {
          where: { returnedAt: null },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async getToolByBarcode(barcode: string) {
    const tool = await this.prisma.toolAsset.findUnique({
      where: { barcode },
      include: {
        issuances: {
          where: { returnedAt: null },
        },
      },
    });
    if (!tool) throw new NotFoundException('Tool not found');
    return tool;
  }

  async issueTool(barcode: string, assignedToUser: string) {
    return this.prisma.$transaction(async (tx) => {
      const tool = await tx.toolAsset.findUnique({ where: { barcode } });
      if (!tool) throw new NotFoundException('Tool not found');
      
      if (tool.status === 'ISSUED') {
        throw new BadRequestException('Tool is already issued out');
      }
      if (tool.status === 'MAINTENANCE') {
        throw new BadRequestException('Tool is under maintenance');
      }

      await tx.toolAsset.update({
        where: { id: tool.id },
        data: { status: 'ISSUED' },
      });

      return tx.toolIssuance.create({
        data: {
          toolId: tool.id,
          assignedToUser,
        },
      });
    });
  }

  async returnTool(barcode: string) {
    return this.prisma.$transaction(async (tx) => {
      const tool = await tx.toolAsset.findUnique({
        where: { barcode },
        include: {
          issuances: {
            where: { returnedAt: null },
          },
        },
      });
      if (!tool) throw new NotFoundException('Tool not found');
      if (tool.status !== 'ISSUED' || tool.issuances.length === 0) {
        throw new BadRequestException('Tool is not currently issued');
      }

      const activeIssuance = tool.issuances[0];

      await tx.toolIssuance.update({
        where: { id: activeIssuance.id },
        data: { returnedAt: new Date() },
      });

      return tx.toolAsset.update({
        where: { id: tool.id },
        data: { status: 'AVAILABLE' },
      });
    });
  }
}
