import { PageOptionsDto } from "../../../core/utils/pagination/page-options.dto";
export declare enum InvoiceStatus {
    PENDING = "PENDING",
    PARTIAL = "PARTIAL",
    PAID = "PAID",
    OVERDUE = "OVERDUE",
    CANCELLED = "CANCELLED"
}
export declare class CreateInvoiceItemDto {
    feeStructureId?: string;
    description: string;
    amount: number;
}
export declare class CreateInvoiceDto {
    studentId: string;
    issueDate: string;
    dueDate: string;
    discount?: number;
    items: CreateInvoiceItemDto[];
}
export declare class UpdateInvoiceDto {
    status?: string;
    dueDate?: string;
    discount?: number;
}
export declare class InvoiceQueryOptionsDto extends PageOptionsDto {
    readonly studentId?: string;
    readonly status?: string;
    readonly invoiceNumber?: string;
}
