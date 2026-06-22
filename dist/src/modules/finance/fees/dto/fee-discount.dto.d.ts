import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare enum DiscountType {
    PERCENTAGE = "PERCENTAGE",
    FIXED = "FIXED"
}
export declare class CreateFeeDiscountDto {
    name: string;
    type: string;
    value: number;
}
declare const UpdateFeeDiscountDto_base: import("@nestjs/common").Type<Partial<CreateFeeDiscountDto>>;
export declare class UpdateFeeDiscountDto extends UpdateFeeDiscountDto_base {
}
export declare class FeeDiscountQueryOptionsDto extends PageOptionsDto {
}
export {};
