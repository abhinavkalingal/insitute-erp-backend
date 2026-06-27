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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getReceptionDashboard() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const [todayVisitors, newEnquiries, appointmentsToday, pendingDocuments] = await Promise.all([
            this.prisma.visitor.count({ where: { checkInAt: { gte: today } } }),
            this.prisma.enquiry.count({ where: { status: 'NEW' } }),
            this.prisma.visitor.count({ where: { status: 'CHECKED_IN' } }),
            0,
        ]);
        const recentActivity = await this.prisma.visitor.findMany({
            take: 5,
            orderBy: { checkInAt: 'desc' },
            select: { name: true, purpose: true, checkInAt: true },
        });
        return {
            stats: {
                todayVisitors,
                newEnquiries,
                appointmentsToday,
                pendingDocuments,
            },
            recentActivity,
        };
    }
    async getOperationsDashboard() {
        const [openTickets, maintenanceTasks, unresolvedIssues] = await Promise.all([
            this.prisma.supportTicket.count({ where: { status: 'OPEN' } }),
            this.prisma.supportTicket.count({ where: { category: 'FACILITY', status: { not: 'RESOLVED' } } }),
            this.prisma.supportTicket.count({ where: { status: { notIn: ['RESOLVED', 'CLOSED'] } } }),
        ]);
        return {
            stats: {
                openTickets,
                maintenanceTasks,
                unresolvedIssues,
                inventoryAlerts: 3,
            },
        };
    }
    async getMarketingDashboard() {
        const [activeCampaigns, totalLeads, newLeadsToday] = await Promise.all([
            this.prisma.campaign.count({ where: { status: 'RUNNING' } }),
            this.prisma.lead.count(),
            this.prisma.lead.count({ where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } }),
        ]);
        return {
            stats: {
                activeCampaigns,
                totalLeads,
                newLeadsToday,
                conversions: Math.floor(totalLeads * 0.15),
            },
        };
    }
    async getDirectorDashboard() {
        const [pendingApprovals, totalStudents, totalRevenue] = await Promise.all([
            this.prisma.approvalRequest.count({ where: { status: 'PENDING' } }),
            this.prisma.student.count(),
            this.prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'COMPLETED' } }),
        ]);
        return {
            stats: {
                pendingApprovals,
                totalStudents,
                totalRevenue: totalRevenue._sum.amount || 0,
                activeCampaigns: await this.prisma.campaign.count({ where: { status: 'RUNNING' } }),
            },
        };
    }
    async getFinanceDashboard() {
        const [totalRevenue, pendingPayments, totalExpenses] = await Promise.all([
            this.prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'COMPLETED' } }),
            this.prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'PENDING' } }),
            0,
        ]);
        return {
            stats: {
                totalRevenue: totalRevenue._sum.amount || 0,
                pendingPayments: pendingPayments._sum.amount || 0,
                totalExpenses,
                netProfit: (totalRevenue._sum.amount || 0) - totalExpenses,
            },
        };
    }
    async getHrDashboard() {
        const [totalEmployees, onLeaveToday, openPositions] = await Promise.all([
            this.prisma.staff.count(),
            this.prisma.leaveRequest.count({ where: { status: 'APPROVED', startDate: { lte: new Date() }, endDate: { gte: new Date() } } }),
            3,
        ]);
        return {
            stats: {
                totalEmployees,
                onLeaveToday,
                openPositions,
                pendingApprovals: await this.prisma.leaveRequest.count({ where: { status: 'PENDING' } }),
            },
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map