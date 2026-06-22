import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class CreateSubscriptionPlanDto {
    name: string;
    description?: string;
    monthlyPrice: number;
    yearlyPrice: number;
    trialDays?: number;
    isActive?: boolean;
}
declare const UpdateSubscriptionPlanDto_base: import("@nestjs/common").Type<Partial<CreateSubscriptionPlanDto>>;
export declare class UpdateSubscriptionPlanDto extends UpdateSubscriptionPlanDto_base {
}
export declare class SubscriptionPlanQueryOptionsDto extends PageOptionsDto {
    readonly isActive?: boolean;
}
export {};
