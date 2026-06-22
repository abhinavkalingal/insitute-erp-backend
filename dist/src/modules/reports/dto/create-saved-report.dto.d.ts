export declare enum ReportModuleType {
    STUDENTS = "STUDENTS",
    STAFF = "STAFF",
    FINANCE = "FINANCE",
    ATTENDANCE = "ATTENDANCE",
    ACADEMICS = "ACADEMICS"
}
export declare class CreateSavedReportDto {
    name: string;
    description?: string;
    module: ReportModuleType;
    filters: string;
    columns: string;
}
