import { PageOptionsDto } from "../../../core/utils/pagination/page-options.dto";
export declare enum PaymentMethod {
    CASH = "CASH",
    CARD = "CARD",
    BANK_TRANSFER = "BANK_TRANSFER",
    ONLINE = "ONLINE"
}
export declare class CreatePaymentDto {
    invoiceId: string;
    amount: number;
    paymentDate?: string;
    paymentMethod: string;
    reference?: string;
    remarks?: string;
}
export declare class PaymentQueryOptionsDto extends PageOptionsDto {
    readonly invoiceId?: string;
    readonly receiptNumber?: string;
}
