import { ToolsService } from './tools.service';
import { Prisma } from '@prisma/client';
export declare class ToolsController {
    private readonly toolsService;
    constructor(toolsService: ToolsService);
    createTool(data: Prisma.ToolAssetCreateInput): Promise<{
        id: string;
        barcode: string;
        name: string;
        category: string;
        status: string;
        condition: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getTools(): Promise<({
        issuances: {
            id: string;
            assignedToUser: string;
            issuedAt: Date;
            expectedReturnAt: Date | null;
            returnedAt: Date | null;
            notes: string | null;
            toolId: string;
        }[];
    } & {
        id: string;
        barcode: string;
        name: string;
        category: string;
        status: string;
        condition: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    issueTool(barcode: string, assignedToUser: string): Promise<{
        id: string;
        assignedToUser: string;
        issuedAt: Date;
        expectedReturnAt: Date | null;
        returnedAt: Date | null;
        notes: string | null;
        toolId: string;
    }>;
    returnTool(barcode: string): Promise<{
        id: string;
        barcode: string;
        name: string;
        category: string;
        status: string;
        condition: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
