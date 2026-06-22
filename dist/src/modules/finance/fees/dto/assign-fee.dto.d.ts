import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class AssignFeeDto {
    studentId: string;
    feeStructureId: string;
    discountId?: string;
    dueDate?: string;
}
export declare class StudentFeeAssignmentQueryOptionsDto extends PageOptionsDto {
    readonly studentId?: string;
    readonly feeStructureId?: string;
    readonly status?: string;
}
