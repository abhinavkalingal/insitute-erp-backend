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
exports.AutomationController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const permissions_guard_1 = require("../../core/guards/permissions.guard");
const permissions_decorator_1 = require("../../core/decorators/permissions.decorator");
const fee_reminder_cron_1 = require("./services/fee-reminder.cron");
const certificate_generation_cron_1 = require("./services/certificate-generation.cron");
const report_scheduler_cron_1 = require("./services/report-scheduler.cron");
const general_reminder_cron_1 = require("./services/general-reminder.cron");
let AutomationController = class AutomationController {
    feeReminderCron;
    certificateGenerationCron;
    reportSchedulerCron;
    generalReminderCron;
    constructor(feeReminderCron, certificateGenerationCron, reportSchedulerCron, generalReminderCron) {
        this.feeReminderCron = feeReminderCron;
        this.certificateGenerationCron = certificateGenerationCron;
        this.reportSchedulerCron = reportSchedulerCron;
        this.generalReminderCron = generalReminderCron;
    }
    async triggerFeeReminders() {
        await this.feeReminderCron.processFeeReminders();
        return { message: 'Fee reminders triggered successfully.' };
    }
    async triggerCertificates() {
        await this.certificateGenerationCron.processCertificates();
        return { message: 'Certificate generation triggered successfully.' };
    }
    async triggerReports() {
        await this.reportSchedulerCron.processScheduledReports();
        return { message: 'Scheduled reports triggered successfully.' };
    }
    async triggerGeneralReminders() {
        await this.generalReminderCron.processUpcomingEvents();
        await this.generalReminderCron.processUpcomingAssignments();
        return { message: 'General reminders triggered successfully.' };
    }
};
exports.AutomationController = AutomationController;
__decorate([
    (0, common_1.Post)('trigger/fee-reminders'),
    (0, permissions_decorator_1.RequirePermissions)('manage:automation'),
    (0, swagger_1.ApiOperation)({ summary: 'Manually trigger fee reminders' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutomationController.prototype, "triggerFeeReminders", null);
__decorate([
    (0, common_1.Post)('trigger/certificates'),
    (0, permissions_decorator_1.RequirePermissions)('manage:automation'),
    (0, swagger_1.ApiOperation)({ summary: 'Manually trigger auto-certificate generation' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutomationController.prototype, "triggerCertificates", null);
__decorate([
    (0, common_1.Post)('trigger/reports'),
    (0, permissions_decorator_1.RequirePermissions)('manage:automation'),
    (0, swagger_1.ApiOperation)({ summary: 'Manually trigger scheduled reports' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutomationController.prototype, "triggerReports", null);
__decorate([
    (0, common_1.Post)('trigger/general-reminders'),
    (0, permissions_decorator_1.RequirePermissions)('manage:automation'),
    (0, swagger_1.ApiOperation)({ summary: 'Manually trigger general event/assignment reminders' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutomationController.prototype, "triggerGeneralReminders", null);
exports.AutomationController = AutomationController = __decorate([
    (0, swagger_1.ApiTags)('Automation (System Admin)'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('automation'),
    __metadata("design:paramtypes", [fee_reminder_cron_1.FeeReminderCron,
        certificate_generation_cron_1.CertificateGenerationCron,
        report_scheduler_cron_1.ReportSchedulerCron,
        general_reminder_cron_1.GeneralReminderCron])
], AutomationController);
//# sourceMappingURL=automation.controller.js.map