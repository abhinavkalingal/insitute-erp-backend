import { PageDto } from "../../core/utils/pagination/page.dto";
import { PrismaMasterService } from "../../infrastructure/database/prisma-master.service";
import { Prisma } from '@prisma-master/client';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { InstituteQueryOptionsDto } from './dto/institute-query-options.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { TenantProvisioningService } from './tenant-provisioning.service';
export declare class InstitutesService {
    private readonly prisma;
    private readonly tenantProvisioningService;
    constructor(prisma: PrismaMasterService, tenantProvisioningService: TenantProvisioningService);
    create(createInstituteDto: CreateInstituteDto): Promise<{
        type: string;
        name: string;
        domain: string | null;
        databaseUrl: string | null;
        isActive: boolean;
        profile: Prisma.JsonValue | null;
        settings: Prisma.JsonValue | null;
        id: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    findAll(queryOptions: InstituteQueryOptionsDto): Promise<PageDto<{
        subscriptions: ({
            plan: {
                description: string | null;
                name: string;
                isActive: boolean;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                monthlyPrice: number;
                yearlyPrice: number;
                trialDays: number;
                features: Prisma.JsonValue | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            billingCycle: string;
            currentPeriodEnd: Date;
            cancelAtPeriodEnd: boolean;
            instituteId: string;
            planId: string;
        })[];
    } & {
        type: string;
        name: string;
        domain: string | null;
        databaseUrl: string | null;
        isActive: boolean;
        profile: Prisma.JsonValue | null;
        settings: Prisma.JsonValue | null;
        id: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>>;
    findOne(id: string): Promise<{
        type: string;
        name: string;
        domain: string | null;
        databaseUrl: string | null;
        isActive: boolean;
        profile: Prisma.JsonValue | null;
        settings: Prisma.JsonValue | null;
        id: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    update(id: string, updateInstituteDto: UpdateInstituteDto): Promise<{
        type: string;
        name: string;
        domain: string | null;
        databaseUrl: string | null;
        isActive: boolean;
        profile: Prisma.JsonValue | null;
        settings: Prisma.JsonValue | null;
        id: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    updateLogo(id: string, logoUrl: string): Promise<{
        type: string;
        name: string;
        domain: string | null;
        databaseUrl: string | null;
        isActive: boolean;
        profile: Prisma.JsonValue | null;
        settings: Prisma.JsonValue | null;
        id: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
