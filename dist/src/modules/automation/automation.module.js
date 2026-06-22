"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const database_module_1 = require("../../infrastructure/database/database.module");
const reports_module_1 = require("../reports/reports.module");
const automation_controller_1 = require("./automation.controller");
const fee_reminder_cron_1 = require("./services/fee-reminder.cron");
const certificate_generation_cron_1 = require("./services/certificate-generation.cron");
const report_scheduler_cron_1 = require("./services/report-scheduler.cron");
const general_reminder_cron_1 = require("./services/general-reminder.cron");
let AutomationModule = class AutomationModule {
};
exports.AutomationModule = AutomationModule;
exports.AutomationModule = AutomationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            database_module_1.DatabaseModule,
            reports_module_1.ReportsModule,
        ],
        controllers: [automation_controller_1.AutomationController],
        providers: [
            fee_reminder_cron_1.FeeReminderCron,
            certificate_generation_cron_1.CertificateGenerationCron,
            report_scheduler_cron_1.ReportSchedulerCron,
            general_reminder_cron_1.GeneralReminderCron,
        ]
    })
], AutomationModule);
//# sourceMappingURL=automation.module.js.map