import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { Prisma } from '@prisma/client';

@Controller('workshop/tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  createTool(@Body() data: Prisma.ToolAssetCreateInput) {
    return this.toolsService.createTool(data);
  }

  @Get()
  getTools() {
    return this.toolsService.getTools();
  }

  @Post('issue')
  issueTool(
    @Body('barcode') barcode: string,
    @Body('assignedToUser') assignedToUser: string,
  ) {
    return this.toolsService.issueTool(barcode, assignedToUser);
  }

  @Post('return')
  returnTool(@Body('barcode') barcode: string) {
    return this.toolsService.returnTool(barcode);
  }
}
