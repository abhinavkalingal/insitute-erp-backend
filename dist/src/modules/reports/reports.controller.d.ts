import type { Response } from 'express';
import { ReportsService } from './services/reports.service';
import { ExportService } from './services/export.service';
import { CreateSavedReportDto } from './dto/create-saved-report.dto';
import { ExecuteReportDto } from './dto/execute-report.dto';
import { ScheduleReportDto } from './dto/schedule-report.dto';
export declare class ReportsController {
    private readonly reportsService;
    private readonly exportService;
    constructor(reportsService: ReportsService, exportService: ExportService);
    executeReport(executeDto: ExecuteReportDto): Promise<any>;
    exportReport(executeDto: ExecuteReportDto, res: Response): Promise<Response<any, Record<string, any>>>;
    saveReport(req: any, createDto: CreateSavedReportDto): Promise<{
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
    getSavedReports(): Promise<{
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
    getSavedReportById(id: string): Promise<{
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
