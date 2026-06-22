import { ExportFormat } from './execute-report.dto';
export declare enum ScheduleFrequency {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY"
}
export declare class ScheduleReportDto {
    savedReportId: string;
    frequency: ScheduleFrequency;
    format: ExportFormat;
    recipients: string;
}
