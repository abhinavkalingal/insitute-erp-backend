import { PrismaMasterService } from "../../../../../infrastructure/database/prisma-master.service";
import { Prisma } from '@prisma-master/client';
import { SubscribeDto, UpgradeDowngradeDto } from '../../dto/subscription.dto';
export declare class SubscriptionsService {
    private readonly prisma;
    constructor(prisma: PrismaMasterService);
    private calculateEndDate;
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
            features: Prisma.JsonValue | null;
            metadata: Prisma.JsonValue | null;
        };
        history: {
            id: string;
            createdAt: Date;
            instituteId: string;
            metadata: Prisma.JsonValue | null;
            action: string;
            subscriptionId: string;
            details: Prisma.JsonValue | null;
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
}
