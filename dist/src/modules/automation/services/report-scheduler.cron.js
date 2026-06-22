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
var ReportSchedulerCron_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportSchedulerCron = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../../infrastructure/database/prisma.service");
const reports_service_1 = require("../../reports/services/reports.service");
const export_service_1 = require("../../reports/services/export.service");
const execute_report_dto_1 = require("../../reports/dto/execute-report.dto");
let ReportSchedulerCron = ReportSchedulerCron_1 = class ReportSchedulerCron {
    prisma;
    reportsService;
    exportService;
    logger = new common_1.Logger(ReportSchedulerCron_1.name);
    constructor(prisma, reportsService, exportService) {
        this.prisma = prisma;
        this.reportsService = reportsService;
        this.exportService = exportService;
    }
    async handleScheduledReports() {
        this.logger.debug('Running scheduled reports check...');
        await this.processScheduledReports();
    }
    async processScheduledReports() {
        const activeSchedules = await this.prisma.scheduledReport.findMany({
            where: { isActive: true },
            include: { savedReport: true }
        });
        for (const schedule of activeSchedules) {
            this.logger.log(`Executing scheduled report: ${schedule.savedReport.name}`);
            try {
                const data = await this.reportsService.executeReport({
                    module: schedule.savedReport.module,
                    filters: schedule.savedReport.filters,
                    columns: schedule.savedReport.columns,
                    format: schedule.format
                });
                let fileBuffer;
                switch (schedule.format) {
                    case execute_report_dto_1.ExportFormat.CSV:
                        fileBuffer = await this.exportService.generateCsv(data);
                        break;
                    case execute_report_dto_1.ExportFormat.EXCEL:
                        fileBuffer = await this.exportService.generateExcel(data);
                        break;
                    case execute_report_dto_1.ExportFormat.PDF:
                        fileBuffer = await this.exportService.generatePdf(data, schedule.savedReport.name);
                        break;
                    default:
                        fileBuffer = JSON.stringify(data);
                }
                const recipients = typeof schedule.recipients === 'string' ? JSON.parse(schedule.recipients) : schedule.recipients;
                this.logger.log(`Would email report to: ${recipients.join(', ')}`);
                await this.prisma.scheduledReport.update({
                    where: { id: schedule.id },
                    data: { lastRunAt: new Date() }
                });
            }
            catch (error) {
                this.logger.error(`Failed to execute scheduled report ${schedule.id}`, error);
            }
        }
    }
};
exports.ReportSchedulerCron = ReportSchedulerCron;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_6AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportSchedulerCron.prototype, "handleScheduledReports", null);
exports.ReportSchedulerCron = ReportSchedulerCron = ReportSchedulerCron_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        reports_service_1.ReportsService,
        export_service_1.ExportService])
], ReportSchedulerCron);
//# sourceMappingURL=report-scheduler.cron.js.map