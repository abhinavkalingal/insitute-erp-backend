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
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            isActive: boolean;
            monthlyPrice: number;
            yearlyPrice: number;
            trialDays: number;
        };
        history: {
            id: string;
            action: string;
            createdAt: Date;
            instituteId: string;
            metadata: Prisma.JsonValue | null;
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
