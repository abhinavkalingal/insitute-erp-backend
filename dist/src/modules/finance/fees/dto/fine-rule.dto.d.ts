import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare enum FineAmountType {
    FIXED = "FIXED",
    PERCENTAGE_PER_DAY = "PERCENTAGE_PER_DAY"
}
export declare class CreateFineRuleDto {
    name: string;
    amountType: string;
    amount: number;
    daysAfterDueDate: number;
}
declare const UpdateFineRuleDto_base: import("@nestjs/common").Type<Partial<CreateFineRuleDto>>;
export declare class UpdateFineRuleDto extends UpdateFineRuleDto_base {
}
export declare class FineRuleQueryOptionsDto extends PageOptionsDto {
}
export {};
