import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare enum BillingCycle {
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY"
}
export declare class SubscribeDto {
    planId: string;
    billingCycle: string;
}
export declare class UpgradeDowngradeDto {
    planId: string;
    billingCycle?: string;
}
export declare class SubscriptionQueryOptionsDto extends PageOptionsDto {
    readonly status?: string;
}
