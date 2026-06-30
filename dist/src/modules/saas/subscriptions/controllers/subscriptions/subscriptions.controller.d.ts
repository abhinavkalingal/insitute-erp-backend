import { SubscribeDto, UpgradeDowngradeDto } from '../../dto/subscription.dto';
import { SubscriptionsService } from '../../services/subscriptions/subscriptions.service';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    getMySubscription(instituteId: string): Promise<{
        plan: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            monthlyPrice: number;
            yearlyPrice: number;
            trialDays: number;
            features: import("@prisma-master/client/runtime/client").JsonValue | null;
            metadata: import("@prisma-master/client/runtime/client").JsonValue | null;
        };
        history: {
            id: string;
            createdAt: Date;
            instituteId: string;
            metadata: import("@prisma-master/client/runtime/client").JsonValue | null;
            action: string;
            subscriptionId: string;
            details: import("@prisma-master/client/runtime/client").JsonValue | null;
            previousPlanId: string | null;
            newPlanId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        instituteId: string;
        planId: string;
        status: string;
        billingCycle: string;
        currentPeriodEnd: Date;
        cancelAtPeriodEnd: boolean;
    }>;
    subscribe(instituteId: string, subscribeDto: SubscribeDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        instituteId: string;
        planId: string;
        status: string;
        billingCycle: string;
        currentPeriodEnd: Date;
        cancelAtPeriodEnd: boolean;
    }>;
    changePlan(instituteId: string, changeDto: UpgradeDowngradeDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        instituteId: string;
        planId: string;
        status: string;
        billingCycle: string;
        currentPeriodEnd: Date;
        cancelAtPeriodEnd: boolean;
    }>;
    cancel(instituteId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        instituteId: string;
        planId: string;
        status: string;
        billingCycle: string;
        currentPeriodEnd: Date;
        cancelAtPeriodEnd: boolean;
    }>;
    renew(instituteId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        instituteId: string;
        planId: string;
        status: string;
        billingCycle: string;
        currentPeriodEnd: Date;
        cancelAtPeriodEnd: boolean;
    }>;
}
