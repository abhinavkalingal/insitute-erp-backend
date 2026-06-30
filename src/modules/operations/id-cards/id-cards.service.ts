import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class IdCardsService {
  constructor(private prisma: PrismaService) {}

  async createTemplate(data: Prisma.IdCardTemplateCreateInput) {
    return this.prisma.idCardTemplate.create({ data });
  }

  async getTemplates() {
    return this.prisma.idCardTemplate.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTemplateById(id: string) {
    const template = await this.prisma.idCardTemplate.findUnique({ where: { id } });
    if (!template) throw new NotFoundException('Template not found');
    return template;
  }

  async updateTemplate(id: string, data: Prisma.IdCardTemplateUpdateInput) {
    return this.prisma.idCardTemplate.update({
      where: { id },
      data,
    });
  }

  async deleteTemplate(id: string) {
    return this.prisma.idCardTemplate.delete({
      where: { id },
    });
  }
}
