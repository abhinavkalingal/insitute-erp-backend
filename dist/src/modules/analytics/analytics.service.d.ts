import { PrismaService } from "../../infrastructure/database/prisma.service";
import { AnalyticsQueryDto } from './dto/analytics-query.dto';
export declare class AnalyticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private buildWhereClause;
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
}
