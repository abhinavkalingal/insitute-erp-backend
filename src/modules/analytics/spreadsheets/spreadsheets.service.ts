import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpreadsheetsService {
  constructor(private prisma: PrismaService) {}

  async createSpreadsheet(data: Prisma.SpreadsheetDocumentCreateInput) {
    return this.prisma.spreadsheetDocument.create({ data });
  }

  async getSpreadsheets() {
    return this.prisma.spreadsheetDocument.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSpreadsheetById(id: string) {
    const doc = await this.prisma.spreadsheetDocument.findUnique({ where: { id } });
    if (!doc) throw new NotFoundException('Spreadsheet not found');
    return doc;
  }

  async updateSpreadsheet(id: string, data: Prisma.SpreadsheetDocumentUpdateInput) {
    return this.prisma.spreadsheetDocument.update({
      where: { id },
      data,
    });
  }

  async deleteSpreadsheet(id: string) {
    return this.prisma.spreadsheetDocument.delete({
      where: { id },
    });
  }
}
