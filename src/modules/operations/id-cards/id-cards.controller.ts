import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IdCardsService } from './id-cards.service';
import { Prisma } from '@prisma/client';

@Controller('operations/id-cards')
export class IdCardsController {
  constructor(private readonly idCardsService: IdCardsService) {}

  @Post()
  createTemplate(@Body() data: Prisma.IdCardTemplateCreateInput) {
    return this.idCardsService.createTemplate(data);
  }

  @Get()
  getTemplates() {
    return this.idCardsService.getTemplates();
  }

  @Get(':id')
  getTemplateById(@Param('id') id: string) {
    return this.idCardsService.getTemplateById(id);
  }

  @Patch(':id')
  updateTemplate(@Param('id') id: string, @Body() data: Prisma.IdCardTemplateUpdateInput) {
    return this.idCardsService.updateTemplate(id, data);
  }

  @Delete(':id')
  deleteTemplate(@Param('id') id: string) {
    return this.idCardsService.deleteTemplate(id);
  }
}
