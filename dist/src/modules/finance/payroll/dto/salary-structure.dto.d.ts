import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class SalaryComponentDto {
    name: string;
    amount: number;
    type: string;
}
export declare class CreateSalaryStructureDto {
    staffId: string;
    basicPay: number;
    allowances?: SalaryComponentDto[];
    deductions?: SalaryComponentDto[];
}
declare const UpdateSalaryStructureDto_base: import("@nestjs/common").Type<Partial<CreateSalaryStructureDto>>;
export declare class UpdateSalaryStructureDto extends UpdateSalaryStructureDto_base {
}
export declare class SalaryStructureQueryOptionsDto extends PageOptionsDto {
    readonly staffId?: string;
}
export {};
