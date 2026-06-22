import { PageOptionsDto } from "../../../core/utils/pagination/page-options.dto";
export declare class AttendanceQueryOptionsDto extends PageOptionsDto {
    readonly date?: string;
    readonly startDate?: string;
    readonly endDate?: string;
    readonly type?: string;
    readonly batchId?: string;
    readonly branchId?: string;
    readonly studentId?: string;
    readonly staffId?: string;
}
