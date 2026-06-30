import { PrismaService } from "../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
export declare class SpreadsheetsService {
    private prisma;
    constructor(prisma: PrismaService);
    createSpreadsheet(data: Prisma.SpreadsheetDocumentCreateInput): Promise<any>;
    getSpreadsheets(): Promise<any>;
    getSpreadsheetById(id: string): Promise<any>;
    updateSpreadsheet(id: string, data: Prisma.SpreadsheetDocumentUpdateInput): Promise<any>;
    deleteSpreadsheet(id: string): Promise<any>;
}
