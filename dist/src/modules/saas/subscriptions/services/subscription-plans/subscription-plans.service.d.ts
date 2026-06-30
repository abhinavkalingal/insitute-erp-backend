import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaMasterService } from "../../../../../infrastructure/database/prisma-master.service";
import { Prisma } from '@prisma-master/client';
import { CreateSubscriptionPlanDto, SubscriptionPlanQueryOptionsDto, UpdateSubscriptionPlanDto } from '../../dto/subscription-plan.dto';
export declare class SubscriptionPlansService {
    private readonly prisma;
    constructor(prisma: PrismaMasterService);
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
        features: Prisma.JsonValue | null;
        metadata: Prisma.JsonValue | null;
    }>;
    findAll(queryOptions: SubscriptionPlanQueryOptionsDto): Promise<PageDto<{
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
        features: Prisma.JsonValue | null;
        metadata: Prisma.JsonValue | null;
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
        features: Prisma.JsonValue | null;
        metadata: Prisma.JsonValue | null;
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
        features: Prisma.JsonValue | null;
        metadata: Prisma.JsonValue | null;
    }>;
}
