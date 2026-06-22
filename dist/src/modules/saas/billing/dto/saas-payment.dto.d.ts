import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare enum SaasPaymentMethod {
    CARD = "CARD",
    UPI = "UPI",
    NETBANKING = "NETBANKING",
    MANUAL = "MANUAL"
}
export declare enum SaasPaymentStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}
export declare class InitiateSaasPaymentDto {
    invoiceId: string;
    amount: number;
    paymentMethod: string;
}
export declare class UpdateSaasPaymentStatusDto {
    status: string;
    transactionId?: string;
    metadata?: any;
}
export declare class SaasPaymentQueryOptionsDto extends PageOptionsDto {
    readonly status?: string;
    readonly invoiceId?: string;
}
