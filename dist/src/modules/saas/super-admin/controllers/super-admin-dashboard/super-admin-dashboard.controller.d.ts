import { SuperAdminDashboardService } from '../../services/super-admin-dashboard/super-admin-dashboard.service';
export declare class SuperAdminDashboardController {
    private readonly dashboardService;
    constructor(dashboardService: SuperAdminDashboardService);
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
    getHealthData(): Promise<{
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
