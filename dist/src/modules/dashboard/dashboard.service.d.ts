import { PrismaService } from '../../infrastructure/database/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getReceptionDashboard(): Promise<{
        stats: {
            todayVisitors: number;
            newEnquiries: number;
            appointmentsToday: number;
            pendingDocuments: number;
        };
        recentActivity: {
            name: string;
            purpose: string;
            checkInAt: Date;
        }[];
    }>;
    getOperationsDashboard(): Promise<{
        stats: {
            openTickets: number;
            maintenanceTasks: number;
            unresolvedIssues: number;
            inventoryAlerts: number;
        };
    }>;
    getMarketingDashboard(): Promise<{
        stats: {
            activeCampaigns: number;
            totalLeads: number;
            newLeadsToday: number;
            conversions: number;
        };
    }>;
    getDirectorDashboard(): Promise<{
        stats: {
            pendingApprovals: number;
            totalStudents: number;
            totalRevenue: number;
            activeCampaigns: number;
        };
    }>;
    getFinanceDashboard(): Promise<{
        stats: {
            totalRevenue: number;
            pendingPayments: number;
            totalExpenses: number;
            netProfit: number;
        };
    }>;
    getHrDashboard(): Promise<{
        stats: {
            totalEmployees: number;
            onLeaveToday: number;
            openPositions: number;
            pendingApprovals: number;
        };
    }>;
}
