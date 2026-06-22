import { PageOptionsDto } from "../../../core/utils/pagination/page-options.dto";
export declare class StaffQueryOptionsDto extends PageOptionsDto {
    readonly department?: string;
    readonly branchId?: string;
    readonly status?: string;
}
