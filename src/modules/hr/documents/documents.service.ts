import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async createDocument(data: Prisma.CompanyDocumentCreateInput) {
    return this.prisma.companyDocument.create({ data });
  }

  async getDocuments() {
    return this.prisma.companyDocument.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getDocumentById(id: string) {
    const doc = await this.prisma.companyDocument.findUnique({ where: { id } });
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async updateDocument(id: string, data: Prisma.CompanyDocumentUpdateInput) {
    return this.prisma.companyDocument.update({
      where: { id },
      data,
    });
  }

  async deleteDocument(id: string) {
    return this.prisma.companyDocument.delete({
      where: { id },
    });
  }
}
