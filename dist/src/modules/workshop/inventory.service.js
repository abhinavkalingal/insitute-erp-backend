"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
let InventoryService = class InventoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createItem(data) {
        return this.prisma.inventoryItem.create({ data });
    }
    async getItems() {
        return this.prisma.inventoryItem.findMany({
            orderBy: { name: 'asc' },
        });
    }
    async getItemById(id) {
        const item = await this.prisma.inventoryItem.findUnique({
            where: { id },
            include: { transactions: { orderBy: { createdAt: 'desc' } } },
        });
        if (!item)
            throw new common_1.NotFoundException('Inventory Item not found');
        return item;
    }
    async updateItem(id, data) {
        return this.prisma.inventoryItem.update({
            where: { id },
            data,
        });
    }
    async deleteItem(id) {
        return this.prisma.inventoryItem.delete({ where: { id } });
    }
    async addTransaction(id, type, quantity, reference, notes) {
        if (quantity <= 0)
            throw new common_1.BadRequestException('Quantity must be greater than zero');
        return this.prisma.$transaction(async (tx) => {
            const item = await tx.inventoryItem.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('Item not found');
            if (type === 'OUT' && item.quantity < quantity) {
                throw new common_1.BadRequestException(`Not enough stock. Only ${item.quantity} available.`);
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
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map