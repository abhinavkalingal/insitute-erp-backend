import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Prisma } from '@prisma/client';

@Controller('workshop/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  createItem(@Body() data: Prisma.InventoryItemCreateInput) {
    return this.inventoryService.createItem(data);
  }

  @Get()
  getItems() {
    return this.inventoryService.getItems();
  }

  @Get(':id')
  getItemById(@Param('id') id: string) {
    return this.inventoryService.getItemById(id);
  }

  @Patch(':id')
  updateItem(@Param('id') id: string, @Body() data: Prisma.InventoryItemUpdateInput) {
    return this.inventoryService.updateItem(id, data);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string) {
    return this.inventoryService.deleteItem(id);
  }

  @Post(':id/transaction')
  addTransaction(
    @Param('id') id: string,
    @Body('type') type: 'IN' | 'OUT',
    @Body('quantity') quantity: number,
    @Body('reference') reference?: string,
    @Body('notes') notes?: string,
  ) {
    return this.inventoryService.addTransaction(id, type, quantity, reference, notes);
  }
}
