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
var FeeReminderCron_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeReminderCron = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../../infrastructure/database/prisma.service");
let FeeReminderCron = FeeReminderCron_1 = class FeeReminderCron {
    prisma;
    logger = new common_1.Logger(FeeReminderCron_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handleFeeReminders() {
        this.logger.debug('Running daily fee reminder check...');
        await this.processFeeReminders();
    }
    async processFeeReminders() {
        const today = new Date();
        const overdueInvoices = await this.prisma.invoice.findMany({
            where: {
                status: { in: ['PENDING', 'PARTIAL'] },
                dueDate: { lt: today }
            },
            include: {
                student: { include: { user: true } },
            }
        });
        for (const invoice of overdueInvoices) {
            this.logger.log(`Sending reminder to ${invoice.student?.user?.email} for invoice ${invoice.invoiceNumber}`);
        }
    }
};
exports.FeeReminderCron = FeeReminderCron;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_8AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeeReminderCron.prototype, "handleFeeReminders", null);
exports.FeeReminderCron = FeeReminderCron = FeeReminderCron_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FeeReminderCron);
//# sourceMappingURL=fee-reminder.cron.js.map