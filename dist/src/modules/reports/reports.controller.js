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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const permissions_decorator_1 = require("../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../core/guards/permissions.guard");
const reports_service_1 = require("./services/reports.service");
const export_service_1 = require("./services/export.service");
const create_saved_report_dto_1 = require("./dto/create-saved-report.dto");
const execute_report_dto_1 = require("./dto/execute-report.dto");
const schedule_report_dto_1 = require("./dto/schedule-report.dto");
let ReportsController = class ReportsController {
    reportsService;
    exportService;
    constructor(reportsService, exportService) {
        this.reportsService = reportsService;
        this.exportService = exportService;
    }
    executeReport(executeDto) {
        return this.reportsService.executeReport(executeDto);
    }
    async exportReport(executeDto, res) {
        const data = await this.reportsService.executeReport(executeDto);
        switch (executeDto.format) {
            case execute_report_dto_1.ExportFormat.CSV: {
                const csv = await this.exportService.generateCsv(data);
                res.header('Content-Type', 'text/csv');
                res.attachment(`report_${Date.now()}.csv`);
                return res.send(csv);
            }
            case execute_report_dto_1.ExportFormat.EXCEL: {
                const buffer = await this.exportService.generateExcel(data);
                res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.attachment(`report_${Date.now()}.xlsx`);
                return res.send(buffer);
            }
            case execute_report_dto_1.ExportFormat.PDF: {
                const buffer = await this.exportService.generatePdf(data, `Report: ${executeDto.module}`);
                res.header('Content-Type', 'application/pdf');
                res.attachment(`report_${Date.now()}.pdf`);
                return res.send(buffer);
            }
            default:
                return res.json(data);
        }
    }
    saveReport(req, createDto) {
        const userId = req.user?.id || req.user?.sub;
        return this.reportsService.saveReport(userId, createDto);
    }
    getSavedReports() {
        return this.reportsService.getSavedReports();
    }
    getSavedReportById(id) {
        return this.reportsService.getSavedReportById(id);
    }
    scheduleReport(scheduleDto) {
        return this.reportsService.scheduleReport(scheduleDto);
    }
    getScheduledReports() {
        return this.reportsService.getScheduledReports();
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Post)('execute'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Execute a dynamic report and get JSON data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [execute_report_dto_1.ExecuteReportDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "executeReport", null);
__decorate([
    (0, common_1.Post)('export'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Execute a dynamic report and export as file' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [execute_report_dto_1.ExecuteReportDto, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportReport", null);
__decorate([
    (0, common_1.Post)('saved'),
    (0, permissions_decorator_1.RequirePermissions)('update:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Save a report configuration' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_saved_report_dto_1.CreateSavedReportDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "saveReport", null);
__decorate([
    (0, common_1.Get)('saved'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all saved reports' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getSavedReports", null);
__decorate([
    (0, common_1.Get)('saved/:id'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific saved report' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getSavedReportById", null);
__decorate([
    (0, common_1.Post)('scheduled'),
    (0, permissions_decorator_1.RequirePermissions)('update:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Schedule a report execution' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schedule_report_dto_1.ScheduleReportDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "scheduleReport", null);
__decorate([
    (0, common_1.Get)('scheduled'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all scheduled reports' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getScheduledReports", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [reports_service_1.ReportsService,
        export_service_1.ExportService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map