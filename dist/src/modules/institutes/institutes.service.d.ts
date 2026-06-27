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
        id: string;
        name: string;
        databaseUrl: string | null;
        domain: string | null;
        logoUrl: string | null;
        profile: Prisma.JsonValue | null;
        settings: Prisma.JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    findAll(queryOptions: InstituteQueryOptionsDto): Promise<PageDto<{
        subscriptions: ({
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
            };
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
        })[];
    } & {
        id: string;
        name: string;
        databaseUrl: string | null;
        domain: string | null;
        logoUrl: string | null;
        profile: Prisma.JsonValue | null;
        settings: Prisma.JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        databaseUrl: string | null;
        domain: string | null;
        logoUrl: string | null;
        profile: Prisma.JsonValue | null;
        settings: Prisma.JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    update(id: string, updateInstituteDto: UpdateInstituteDto): Promise<{
        id: string;
        name: string;
        databaseUrl: string | null;
        domain: string | null;
        logoUrl: string | null;
        profile: Prisma.JsonValue | null;
        settings: Prisma.JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    updateLogo(id: string, logoUrl: string): Promise<{
        id: string;
        name: string;
        databaseUrl: string | null;
        domain: string | null;
        logoUrl: string | null;
        profile: Prisma.JsonValue | null;
        settings: Prisma.JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
