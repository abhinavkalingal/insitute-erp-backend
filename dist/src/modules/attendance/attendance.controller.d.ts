import { AttendanceService } from './attendance.service';
import { AttendanceQueryOptionsDto } from './dto/attendance-query-options.dto';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    markAttendance(req: any, markAttendanceDto: MarkAttendanceDto): Promise<any>;
    findAll(queryOptions: AttendanceQueryOptionsDto): Promise<import("../../core/utils/pagination/page.dto").PageDto<{
        _count: {
            records: number;
        };
        batch: {
            name: string;
            course: {
                name: string;
            };
        } | null;
        takenBy: {
            firstName: string;
            lastName: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        type: string;
        batchId: string | null;
        branchId: string | null;
        takenById: string;
    }>>;
    findOne(id: string): Promise<any>;
    getStudentHistory(studentId: string, queryOptions: AttendanceQueryOptionsDto): Promise<({
        attendance: {
            date: Date;
            type: string;
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
