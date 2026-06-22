import { ReportModuleType } from './create-saved-report.dto';
export declare enum ExportFormat {
    JSON = "JSON",
    CSV = "CSV",
    EXCEL = "EXCEL",
    PDF = "PDF"
}
export declare class ExecuteReportDto {
    module: ReportModuleType;
    filters?: string;
    columns?: string;
    format?: ExportFormat;
}
