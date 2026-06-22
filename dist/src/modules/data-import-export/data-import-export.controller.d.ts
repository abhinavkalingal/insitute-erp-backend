import type { Response } from 'express';
import { DataImportExportService } from './data-import-export.service';
export declare class DataImportExportController {
    private readonly importExportService;
    constructor(importExportService: DataImportExportService);
    downloadTemplate(entity: string, res: Response): Response<any, Record<string, any>>;
    importData(entity: string, file: Express.Multer.File): Promise<{
        totalProcessed: number;
        successCount: number;
        errorCount: number;
        successLogs: any[];
        errorLogs: any[];
    }>;
}
