import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
            totalStudents: number;
            totalRevenue: number;
            activeBatches: number;
            attendancePercentage: number;
            pendingApprovals: number;
            activeCampaigns: number;
        };
        charts: {
            revenueVsExpenses: {
                month: string;
                revenue: number;
                expenses: number;
            }[];
            admissionsPipeline: {
                label: string;
                value: number;
            }[];
        };
        tasks: {
            id: string;
            title: string;
            dueDate: string;
            priority: string;
        }[];
        activities: {
            title: string;
            description: string;
            time: string;
            severity: string;
        }[];
    }>;
    getFinanceDashboard(): Promise<{
        stats: {
            totalRevenue: number;
            outstandingFees: number;
            totalExpenses: number;
            bankBalance: number;
        };
        recentTransactions: {
            id: string;
            desc: string;
            amount: string;
            status: string;
            date: string;
            isCredit: boolean;
        }[];
        pendingApprovals: {
            id: string;
            title: string;
            subtitle: string;
            amount: string;
        }[];
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
