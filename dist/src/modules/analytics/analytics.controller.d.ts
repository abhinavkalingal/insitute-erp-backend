import { AnalyticsService } from './analytics.service';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getDashboardOverview(query: AnalyticsQueryDto): Promise<{
        totalStudents: number;
        totalStaff: number;
        totalCourses: number;
        financials: {
            totalRevenue: number;
            pendingRevenue: number;
        };
    }>;
    getStudentAnalytics(query: AnalyticsQueryDto): Promise<{
        total: number;
        distribution: {
            active: number;
            alumni: number;
            dropped: number;
        };
    }>;
    getRevenueAnalytics(query: AnalyticsQueryDto): Promise<{
        totalInvoiced: number;
        totalPaid: number;
        totalDiscounts: number;
        totalPending: number;
        byStatus: {
            status: string;
            count: number;
            amount: number | null;
        }[];
    }>;
    getAttendanceAnalytics(query: AnalyticsQueryDto): Promise<{
        totalRecords: number;
        present: number;
        late: number;
        absent: number;
        presentPercentage: number;
    }>;
    getCourseAnalytics(query: AnalyticsQueryDto): Promise<{
        totalCourses: number;
        activeCourses: number;
        totalBatches: number;
        totalSubjects: number;
    }>;
    getFacultyAnalytics(query: AnalyticsQueryDto): Promise<{
        totalStaff: number;
        activeStaff: number;
        onLeaveStaff: number;
        departments: {
            department: string;
            count: number;
        }[];
    }>;
    getLeadAnalytics(query: AnalyticsQueryDto): Promise<{
        totalLeads: number;
        convertedLeads: number;
        lostLeads: number;
        conversionRate: number;
    }>;
    getOperationsAnalytics(query: AnalyticsQueryDto): Promise<{
        openTickets: number;
        resolvedTickets: number;
        pendingApprovals: number;
    }>;
    getSystemAnalytics(query: AnalyticsQueryDto): Promise<{
        cpuUsage: string;
        memoryUsage: string;
        activeUsers: number;
        uptime: string;
    }>;
    getAcademicAnalytics(query: AnalyticsQueryDto): Promise<{
        activeCourses: number;
        activeBatches: number;
        averageAttendance: string;
    }>;
    getBranchAnalytics(query: AnalyticsQueryDto): Promise<{
        id: string;
        name: string;
        students: number;
        staff: number;
    }[]>;
}
