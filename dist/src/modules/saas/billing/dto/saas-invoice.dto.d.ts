import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare enum SaasInvoiceStatus {
    DUE = "DUE",
    PAID = "PAID",
    FAILED = "FAILED",
    VOID = "VOID"
}
export declare class GenerateSaasInvoiceDto {
    subscriptionId?: string;
    amount: number;
    dueDate: string;
}
export declare class SaasInvoiceQueryOptionsDto extends PageOptionsDto {
    readonly status?: string;
}
