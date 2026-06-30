import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { Prisma } from '@prisma/client';

@Controller('hr/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  createDocument(@Body() data: Prisma.CompanyDocumentCreateInput) {
    return this.documentsService.createDocument(data);
  }

  @Get()
  getDocuments() {
    return this.documentsService.getDocuments();
  }

  @Get(':id')
  getDocumentById(@Param('id') id: string) {
    return this.documentsService.getDocumentById(id);
  }

  @Patch(':id')
  updateDocument(@Param('id') id: string, @Body() data: Prisma.CompanyDocumentUpdateInput) {
    return this.documentsService.updateDocument(id, data);
  }

  @Delete(':id')
  deleteDocument(@Param('id') id: string) {
    return this.documentsService.deleteDocument(id);
  }
}
