import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class GeneratePayrollSlipDto {
    staffId: string;
    month: number;
    year: number;
}
export declare class PayPayrollSlipDto {
    paymentDate: string;
    paymentMethod: string;
    reference?: string;
}
export declare class PayrollSlipQueryOptionsDto extends PageOptionsDto {
    readonly staffId?: string;
    readonly month?: number;
    readonly year?: number;
    readonly status?: string;
}
