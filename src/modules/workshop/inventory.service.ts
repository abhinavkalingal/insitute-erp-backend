import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async createItem(data: Prisma.InventoryItemCreateInput) {
    return this.prisma.inventoryItem.create({ data });
  }

  async getItems() {
    return this.prisma.inventoryItem.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getItemById(id: string) {
    const item = await this.prisma.inventoryItem.findUnique({
      where: { id },
      include: { transactions: { orderBy: { createdAt: 'desc' } } },
    });
    if (!item) throw new NotFoundException('Inventory Item not found');
    return item;
  }

  async updateItem(id: string, data: Prisma.InventoryItemUpdateInput) {
    return this.prisma.inventoryItem.update({
      where: { id },
      data,
    });
  }

  async deleteItem(id: string) {
    return this.prisma.inventoryItem.delete({ where: { id } });
  }

  async addTransaction(id: string, type: 'IN' | 'OUT', quantity: number, reference?: string, notes?: string) {
    if (quantity <= 0) throw new BadRequestException('Quantity must be greater than zero');
    
    return this.prisma.$transaction(async (tx) => {
      const item = await tx.inventoryItem.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Item not found');

      if (type === 'OUT' && item.quantity < quantity) {
        throw new BadRequestException(`Not enough stock. Only ${item.quantity} available.`);
      }

      const newQuantity = type === 'IN' ? item.quantity + quantity : item.quantity - quantity;

      await tx.inventoryItem.update({
        where: { id },
        data: { quantity: newQuantity },
      });

      return tx.inventoryTransaction.create({
        data: {
          itemId: id,
          type,
          quantity,
          reference,
          notes,
        },
      });
    });
  }
}
