import { PageOptionsDto } from "../../../core/utils/pagination/page-options.dto";
export declare class StudentQueryOptionsDto extends PageOptionsDto {
    readonly courseId?: string;
    readonly batchId?: string;
    readonly branchId?: string;
    readonly status?: string;
}
