import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaMasterService } from "../../../../../infrastructure/database/prisma-master.service";
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
    }>;
}
