import { InventoryService } from './inventory.service';
import { Prisma } from '@prisma/client';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    createItem(data: Prisma.InventoryItemCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        category: string;
        sku: string;
        quantity: number;
        unit: string;
        reorderLevel: number;
        unitCost: number | null;
    }>;
    getItems(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        category: string;
        sku: string;
        quantity: number;
        unit: string;
        reorderLevel: number;
        unitCost: number | null;
    }[]>;
    getItemById(id: string): Promise<{
        transactions: {
            id: string;
            createdAt: Date;
            type: string;
            reference: string | null;
            notes: string | null;
            quantity: number;
            itemId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        category: string;
        sku: string;
        quantity: number;
        unit: string;
        reorderLevel: number;
        unitCost: number | null;
    }>;
    updateItem(id: string, data: Prisma.InventoryItemUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        category: string;
        sku: string;
        quantity: number;
        unit: string;
        reorderLevel: number;
        unitCost: number | null;
    }>;
    deleteItem(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        category: string;
        sku: string;
        quantity: number;
        unit: string;
        reorderLevel: number;
        unitCost: number | null;
    }>;
    addTransaction(id: string, type: 'IN' | 'OUT', quantity: number, reference?: string, notes?: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        reference: string | null;
        notes: string | null;
        quantity: number;
        itemId: string;
    }>;
}
