import { PrismaService } from "../../../infrastructure/database/prisma.service";
import { CreateSavedReportDto } from '../dto/create-saved-report.dto';
import { ExecuteReportDto } from '../dto/execute-report.dto';
import { ScheduleReportDto } from '../dto/schedule-report.dto';
export declare class ReportsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private getPrismaDelegate;
    executeReport(executeDto: ExecuteReportDto): Promise<any>;
    saveReport(userId: string, createDto: CreateSavedReportDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        module: string;
        filters: import("@prisma/client/runtime/client").JsonValue;
        columns: import("@prisma/client/runtime/client").JsonValue;
    }>;
    getSavedReports(userId?: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        module: string;
        filters: import("@prisma/client/runtime/client").JsonValue;
        columns: import("@prisma/client/runtime/client").JsonValue;
    }[]>;
    getSavedReportById(reportId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        module: string;
        filters: import("@prisma/client/runtime/client").JsonValue;
        columns: import("@prisma/client/runtime/client").JsonValue;
    }>;
    scheduleReport(scheduleDto: ScheduleReportDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        format: string;
        savedReportId: string;
        frequency: string;
        recipients: import("@prisma/client/runtime/client").JsonValue;
        lastRunAt: Date | null;
        nextRunAt: Date | null;
    }>;
    getScheduledReports(): Promise<({
        savedReport: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string | null;
            module: string;
            filters: import("@prisma/client/runtime/client").JsonValue;
            columns: import("@prisma/client/runtime/client").JsonValue;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        format: string;
        savedReportId: string;
        frequency: string;
        recipients: import("@prisma/client/runtime/client").JsonValue;
        lastRunAt: Date | null;
        nextRunAt: Date | null;
    })[]>;
}
