import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare enum PaymentMethod {
    CASH = "CASH",
    CARD = "CARD",
    BANK_TRANSFER = "BANK_TRANSFER",
    ONLINE = "ONLINE"
}
export declare class CollectPaymentDto {
    invoiceId: string;
    amount: number;
    paymentMethod: string;
    reference?: string;
    remarks?: string;
}
export declare class PaymentQueryOptionsDto extends PageOptionsDto {
    readonly invoiceId?: string;
    readonly status?: string;
}
