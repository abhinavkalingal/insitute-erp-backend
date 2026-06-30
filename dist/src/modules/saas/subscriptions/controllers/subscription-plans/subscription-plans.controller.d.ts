import { CreateSubscriptionPlanDto, SubscriptionPlanQueryOptionsDto, UpdateSubscriptionPlanDto } from '../../dto/subscription-plan.dto';
import { SubscriptionPlansService } from '../../services/subscription-plans/subscription-plans.service';
export declare class SubscriptionPlansController {
    private readonly subscriptionPlansService;
    constructor(subscriptionPlansService: SubscriptionPlansService);
    create(createDto: CreateSubscriptionPlanDto): Promise<{
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
    }>;
    findAll(queryOptions: SubscriptionPlanQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
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
    }>>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, updateDto: UpdateSubscriptionPlanDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
