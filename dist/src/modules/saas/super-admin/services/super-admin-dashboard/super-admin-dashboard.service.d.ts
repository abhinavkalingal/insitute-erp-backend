import { PrismaMasterService } from "../../../../../infrastructure/database/prisma-master.service";
export declare class SuperAdminDashboardService {
    private readonly prisma;
    constructor(prisma: PrismaMasterService);
    getFinancialMetrics(): Promise<{
        mrr: number;
        ytdRevenue: number;
        pendingRevenue: number;
    }>;
    getTenantMetrics(): Promise<Record<string, number>>;
    getUsageMetrics(): Promise<{
        totalStudents: number;
        totalStaff: number;
        activeDevices: number;
    }>;
    getChartData(): Promise<{
        revenueAnalytics: {
            label: string;
            value: number;
        }[];
        userGrowth: {
            label: string;
            value: number;
        }[];
    }>;
    getRecentActivity(): Promise<{
        type: string;
        title: string;
        description: string;
        timestamp: string;
    }[]>;
    getDashboardData(): Promise<{
        financial: {
            mrr: number;
            ytdRevenue: number;
            pendingRevenue: number;
        };
        tenants: Record<string, number>;
        usage: {
            totalStudents: number;
            totalStaff: number;
            activeDevices: number;
        };
        charts: {
            revenueAnalytics: {
                label: string;
                value: number;
            }[];
            userGrowth: {
                label: string;
                value: number;
            }[];
        };
        recentActivity: {
            type: string;
            title: string;
            description: string;
            timestamp: string;
        }[];
        generatedAt: string;
    }>;
    getSystemHealth(): Promise<{
        cpuUsagePercent: number;
        memory: {
            total: number;
            used: number;
            free: number;
        };
        storage: {
            total: number;
            used: number;
        };
        uptime: number;
    }>;
}
