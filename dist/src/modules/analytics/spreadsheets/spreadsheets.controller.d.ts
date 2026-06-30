import { SpreadsheetsService } from './spreadsheets.service';
import { Prisma } from '@prisma/client';
export declare class SpreadsheetsController {
    private readonly spreadsheetsService;
    constructor(spreadsheetsService: SpreadsheetsService);
    createSpreadsheet(data: Prisma.SpreadsheetDocumentCreateInput): Promise<any>;
    getSpreadsheets(): Promise<any>;
    getSpreadsheetById(id: string): Promise<any>;
    updateSpreadsheet(id: string, data: Prisma.SpreadsheetDocumentUpdateInput): Promise<any>;
    deleteSpreadsheet(id: string): Promise<any>;
}
