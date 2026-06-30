import { PageDto } from "../../core/utils/pagination/page.dto";
import { PrismaService } from "../../infrastructure/database/prisma.service";
import { AttendanceQueryOptionsDto } from './dto/attendance-query-options.dto';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';
export declare class AttendanceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    markAttendance(takenById: string, dto: MarkAttendanceDto): Promise<any>;
    findAll(queryOptions: AttendanceQueryOptionsDto): Promise<PageDto<{
        batch: {
            course: {
                name: string;
            };
            name: string;
        } | null;
        _count: {
            records: number;
        };
        takenBy: {
            firstName: string;
            lastName: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        date: Date;
        batchId: string | null;
        branchId: string | null;
        takenById: string;
    }>>;
    findOne(id: string, tx?: any): Promise<any>;
    getStudentHistory(studentId: string, queryOptions: AttendanceQueryOptionsDto): Promise<({
        attendance: {
            type: string;
            date: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        staffId: string | null;
        studentId: string | null;
        remarks: string | null;
        attendanceId: string;
    })[]>;
}
