import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare enum ExpenseStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    PAID = "PAID"
}
export declare class CreateExpenseDto {
    categoryId: string;
    vendorId?: string;
    title: string;
    description?: string;
    amount: number;
    expenseDate?: string;
    billUrl?: string;
    referenceNumber?: string;
}
declare const UpdateExpenseDto_base: import("@nestjs/common").Type<Partial<CreateExpenseDto>>;
export declare class UpdateExpenseDto extends UpdateExpenseDto_base {
    status?: string;
}
export declare class ExpenseQueryOptionsDto extends PageOptionsDto {
    readonly categoryId?: string;
    readonly vendorId?: string;
    readonly status?: string;
    readonly startDate?: string;
    readonly endDate?: string;
}
export {};
