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
var GeneralReminderCron_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralReminderCron = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../../infrastructure/database/prisma.service");
let GeneralReminderCron = GeneralReminderCron_1 = class GeneralReminderCron {
    prisma;
    logger = new common_1.Logger(GeneralReminderCron_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handleGeneralReminders() {
        this.logger.debug('Running general reminders check...');
        await this.processUpcomingEvents();
        await this.processUpcomingAssignments();
    }
    async processUpcomingEvents() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
        const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));
        const upcomingEvents = await this.prisma.event.findMany({
            where: {
                startDate: {
                    gte: startOfTomorrow,
                    lte: endOfTomorrow
                }
            },
            include: {
                participants: {
                    include: { student: { include: { user: true } }, staff: { include: { user: true } } }
                }
            }
        });
        for (const event of upcomingEvents) {
            this.logger.log(`Reminder: Event '${event.title}' is happening tomorrow!`);
        }
    }
    async processUpcomingAssignments() {
        const inTwoDays = new Date();
        inTwoDays.setDate(inTwoDays.getDate() + 2);
        const startOfDay = new Date(inTwoDays.setHours(0, 0, 0, 0));
        const endOfDay = new Date(inTwoDays.setHours(23, 59, 59, 999));
        const upcomingAssignments = await this.prisma.assignment.findMany({
            where: {
                dueDate: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            include: {
                course: {
                    include: { students: { include: { user: true } } }
                }
            }
        });
        for (const assignment of upcomingAssignments) {
            this.logger.log(`Reminder: Assignment '${assignment.title}' is due in 2 days!`);
        }
    }
};
exports.GeneralReminderCron = GeneralReminderCron;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_9AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GeneralReminderCron.prototype, "handleGeneralReminders", null);
exports.GeneralReminderCron = GeneralReminderCron = GeneralReminderCron_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GeneralReminderCron);
//# sourceMappingURL=general-reminder.cron.js.map