export declare enum AttendanceType {
    STUDENT = "STUDENT",
    STAFF = "STAFF"
}
export declare enum AttendanceStatus {
    PRESENT = "PRESENT",
    ABSENT = "ABSENT",
    LATE = "LATE",
    HALF_DAY = "HALF_DAY",
    EXCUSED = "EXCUSED"
}
export declare class AttendanceRecordDto {
    studentId?: string;
    staffId?: string;
    status: string;
    remarks?: string;
}
export declare class MarkAttendanceDto {
    date: string;
    type: string;
    batchId?: string;
    branchId?: string;
    records: AttendanceRecordDto[];
}
