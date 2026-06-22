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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma.service");
const create_saved_report_dto_1 = require("../dto/create-saved-report.dto");
let ReportsService = class ReportsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getPrismaDelegate(module) {
        switch (module) {
            case create_saved_report_dto_1.ReportModuleType.STUDENTS:
                return this.prisma.student;
            case create_saved_report_dto_1.ReportModuleType.STAFF:
                return this.prisma.staff;
            case create_saved_report_dto_1.ReportModuleType.FINANCE:
                return this.prisma.invoice;
            case create_saved_report_dto_1.ReportModuleType.ATTENDANCE:
                return this.prisma.attendanceRecord;
            case create_saved_report_dto_1.ReportModuleType.ACADEMICS:
                return this.prisma.course;
            default:
                throw new common_1.BadRequestException('Invalid report module');
        }
    }
    async executeReport(executeDto) {
        const delegate = this.getPrismaDelegate(executeDto.module);
        let parsedFilters = {};
        if (executeDto.filters) {
            try {
                parsedFilters = JSON.parse(executeDto.filters);
            }
            catch (e) {
                throw new common_1.BadRequestException('Invalid JSON for filters');
            }
        }
        let parsedColumns = {};
        if (executeDto.columns) {
            try {
                const cols = JSON.parse(executeDto.columns);
                if (Array.isArray(cols)) {
                    cols.forEach((col) => {
                        parsedColumns[col] = true;
                    });
                }
            }
            catch (e) {
                throw new common_1.BadRequestException('Invalid JSON for columns. Must be an array of strings.');
            }
        }
        const queryArgs = {
            where: {
                ...parsedFilters
            }
        };
        if (Object.keys(parsedColumns).length > 0) {
            queryArgs.select = parsedColumns;
        }
        try {
            const results = await delegate.findMany(queryArgs);
            return results;
        }
        catch (e) {
            throw new common_1.BadRequestException('Failed to execute dynamic report. Check filters and columns.');
        }
    }
    async saveReport(userId, createDto) {
        return this.prisma.savedReport.create({
            data: {
                userId,
                name: createDto.name,
                description: createDto.description,
                module: createDto.module,
                filters: createDto.filters,
                columns: createDto.columns
            }
        });
    }
    async getSavedReports(userId) {
        const where = {};
        if (userId) {
            where.userId = userId;
        }
        return this.prisma.savedReport.findMany({ where });
    }
    async getSavedReportById(reportId) {
        const report = await this.prisma.savedReport.findFirst({
            where: { id: reportId }
        });
        if (!report)
            throw new common_1.NotFoundException('Saved report not found');
        return report;
    }
    async scheduleReport(scheduleDto) {
        await this.getSavedReportById(scheduleDto.savedReportId);
        return this.prisma.scheduledReport.create({
            data: {
                savedReportId: scheduleDto.savedReportId,
                frequency: scheduleDto.frequency,
                format: scheduleDto.format,
                recipients: scheduleDto.recipients
            }
        });
    }
    async getScheduledReports() {
        return this.prisma.scheduledReport.findMany({
            where: {},
            include: {
                savedReport: true
            }
        });
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map