"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminDashboardService = void 0;
const prisma_master_service_1 = require("../../../../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
const os = __importStar(require("os"));
let SuperAdminDashboardService = class SuperAdminDashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFinancialMetrics() {
        const activeSubscriptions = await this.prisma.subscription.findMany({
            where: {
                status: 'ACTIVE'
            },
            include: {
                plan: true
            }
        });
        let mrr = 0;
        for (const sub of activeSubscriptions) {
            mrr += sub.plan.monthlyPrice;
        }
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        const ytdRevenue = await this.prisma.saasInvoice.aggregate({
            where: {
                status: 'PAID',
                paidAt: {
                    gte: startOfYear
                }
            },
            _sum: {
                amount: true
            }
        });
        const pendingRevenue = await this.prisma.saasInvoice.aggregate({
            where: {
                status: 'DRAFT'
            },
            _sum: {
                amount: true
            }
        });
        return {
            mrr: Math.round(mrr * 100) / 100,
            ytdRevenue: ytdRevenue._sum.amount || 0,
            pendingRevenue: pendingRevenue._sum.amount || 0
        };
    }
    async getTenantMetrics() {
        const subscriptions = await this.prisma.subscription.groupBy({
            by: ['status'],
            _count: {
                id: true
            }
        });
        const metrics = {
            ACTIVE: 0,
            TRIALING: 0,
            PAST_DUE: 0,
            CANCELED: 0,
            TOTAL: 0
        };
        subscriptions.forEach((sub) => {
            metrics[sub.status] = sub._count.id;
            metrics.TOTAL += sub._count.id;
        });
        return metrics;
    }
    async getUsageMetrics() {
        const [students, staff, devices] = await Promise.all([
            Promise.resolve(0),
            Promise.resolve(0),
            Promise.resolve(0),
        ]);
        return {
            totalStudents: students,
            totalStaff: staff,
            activeDevices: devices
        };
    }
    async getChartData() {
        const months = 6;
        const now = new Date();
        const revenueAnalytics = [];
        const userGrowth = [];
        for (let i = months - 1; i >= 0; i--) {
            const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999);
            const monthLabel = monthStart.toLocaleString('default', { month: 'short' });
            const revenueAgg = await this.prisma.saasInvoice.aggregate({
                where: {
                    status: 'PAID',
                    paidAt: {
                        gte: monthStart,
                        lte: monthEnd,
                    },
                },
                _sum: {
                    amount: true,
                },
            });
            revenueAnalytics.push({
                label: monthLabel,
                value: revenueAgg._sum.amount || 0,
            });
            const institutesCount = await this.prisma.institute.count({
                where: {
                    createdAt: {
                        lte: monthEnd,
                    },
                    isActive: true,
                },
            });
            userGrowth.push({
                label: monthLabel,
                value: institutesCount,
            });
        }
        return {
            revenueAnalytics,
            userGrowth,
        };
    }
    async getRecentActivity() {
        const recentInstitutes = await this.prisma.institute.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
        });
        const recentSubs = await this.prisma.subscriptionHistory.findMany({
            include: { institute: true },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });
        const recentPayments = await this.prisma.saasPayment.findMany({
            include: { institute: true },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });
        const activities = [];
        for (const inst of recentInstitutes) {
            activities.push({
                type: 'INSTITUTE_REGISTERED',
                title: 'New Institute Registered',
                description: `${inst.name} successfully completed the onboarding process.`,
                timestamp: inst.createdAt.toISOString(),
            });
        }
        for (const sub of recentSubs) {
            activities.push({
                type: 'SUBSCRIPTION_UPDATE',
                title: `Subscription ${sub.action}`,
                description: `${sub.institute.name} changed subscription.`,
                timestamp: sub.createdAt.toISOString(),
            });
        }
        for (const pay of recentPayments) {
            activities.push({
                type: pay.status === 'FAILED' ? 'PAYMENT_FAILED' : 'PAYMENT_SUCCESS',
                title: pay.status === 'FAILED' ? 'Payment Failed' : 'Payment Success',
                description: `Payment for ${pay.institute.name} ${pay.status.toLowerCase()}.`,
                timestamp: pay.createdAt.toISOString(),
            });
        }
        activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        return activities.slice(0, 5);
    }
    async getDashboardData() {
        const [financial, tenants, usage, charts, recentActivity] = await Promise.all([
            this.getFinancialMetrics(),
            this.getTenantMetrics(),
            this.getUsageMetrics(),
            this.getChartData(),
            this.getRecentActivity(),
        ]);
        return {
            financial,
            tenants,
            usage,
            charts,
            recentActivity,
            generatedAt: new Date().toISOString()
        };
    }
    async getSystemHealth() {
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = totalMemory - freeMemory;
        const cpuLoad = os.loadavg()[0];
        const numCpus = os.cpus().length;
        const cpuUsagePercent = Math.min(100, Math.max(0, Math.round((cpuLoad / numCpus) * 100)));
        const totalStorage = 5 * 1024 * 1024 * 1024 * 1024;
        const usedStorage = 1.2 * 1024 * 1024 * 1024 * 1024;
        return {
            cpuUsagePercent,
            memory: {
                total: totalMemory,
                used: usedMemory,
                free: freeMemory,
            },
            storage: {
                total: totalStorage,
                used: usedStorage,
            },
            uptime: os.uptime(),
        };
    }
};
exports.SuperAdminDashboardService = SuperAdminDashboardService;
exports.SuperAdminDashboardService = SuperAdminDashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_master_service_1.PrismaMasterService])
], SuperAdminDashboardService);
//# sourceMappingURL=super-admin-dashboard.service.js.map