import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class CreateStaffLoanDto {
    staffId: string;
    amount: number;
    reason: string;
    deductionPerMonth: number;
}
declare const UpdateStaffLoanDto_base: import("@nestjs/common").Type<Partial<CreateStaffLoanDto>>;
export declare class UpdateStaffLoanDto extends UpdateStaffLoanDto_base {
    status?: string;
}
export declare class StaffLoanQueryOptionsDto extends PageOptionsDto {
    readonly staffId?: string;
    readonly status?: string;
}
export {};
