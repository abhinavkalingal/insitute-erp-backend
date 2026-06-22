import { PrismaService } from "../../../infrastructure/database/prisma.service";
import { ReportsService } from "../../reports/services/reports.service";
import { ExportService } from "../../reports/services/export.service";
export declare class ReportSchedulerCron {
    private readonly prisma;
    private readonly reportsService;
    private readonly exportService;
    private readonly logger;
    constructor(prisma: PrismaService, reportsService: ReportsService, exportService: ExportService);
    handleScheduledReports(): Promise<void>;
    processScheduledReports(): Promise<void>;
}
