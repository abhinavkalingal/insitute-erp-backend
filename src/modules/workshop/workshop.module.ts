import { Module } from '@nestjs/common';
import { RepairTicketsService } from './repair-tickets.service';
import { RepairTicketsController } from './repair-tickets.controller';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { PrismaService } from '@infrastructure/database/prisma.service';

@Module({
  controllers: [RepairTicketsController, InventoryController, ToolsController],
  providers: [RepairTicketsService, InventoryService, ToolsService, PrismaService],
  exports: [RepairTicketsService, InventoryService, ToolsService],
})
export class WorkshopModule {}
