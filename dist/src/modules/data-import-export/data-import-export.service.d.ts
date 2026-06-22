import { PrismaService } from "../../infrastructure/database/prisma.service";
export declare class DataImportExportService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    generateStudentTemplate(): string;
    importStudents(fileBuffer: Buffer): Promise<{
        totalProcessed: number;
        successCount: number;
        errorCount: number;
        successLogs: any[];
        errorLogs: any[];
    }>;
}
