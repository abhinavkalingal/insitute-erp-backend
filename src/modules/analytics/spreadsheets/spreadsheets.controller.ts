import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpreadsheetsService } from './spreadsheets.service';
import { Prisma } from '@prisma/client';

@Controller('analytics/spreadsheets')
export class SpreadsheetsController {
  constructor(private readonly spreadsheetsService: SpreadsheetsService) {}

  @Post()
  createSpreadsheet(@Body() data: Prisma.SpreadsheetDocumentCreateInput) {
    return this.spreadsheetsService.createSpreadsheet(data);
  }

  @Get()
  getSpreadsheets() {
    return this.spreadsheetsService.getSpreadsheets();
  }

  @Get(':id')
  getSpreadsheetById(@Param('id') id: string) {
    return this.spreadsheetsService.getSpreadsheetById(id);
  }

  @Patch(':id')
  updateSpreadsheet(@Param('id') id: string, @Body() data: Prisma.SpreadsheetDocumentUpdateInput) {
    return this.spreadsheetsService.updateSpreadsheet(id, data);
  }

  @Delete(':id')
  deleteSpreadsheet(@Param('id') id: string) {
    return this.spreadsheetsService.deleteSpreadsheet(id);
  }
}
