import { StorageService } from "../storage/storage.service";
import { CreateInstituteDto } from './dto/create-institute.dto';
import { InstituteQueryOptionsDto } from './dto/institute-query-options.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { InstitutesService } from './institutes.service';
export declare class InstitutesController {
    private readonly institutesService;
    private readonly storageService;
    constructor(institutesService: InstitutesService, storageService: StorageService);
    create(createInstituteDto: CreateInstituteDto): Promise<{
        type: string;
        name: string;
        domain: string | null;
        databaseUrl: string | null;
        isActive: boolean;
        profile: import("@prisma-master/client/runtime/client").JsonValue | null;
        settings: import("@prisma-master/client/runtime/client").JsonValue | null;
        id: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    findAll(queryOptions: InstituteQueryOptionsDto): Promise<import("../../core/utils/pagination/page.dto").PageDto<{
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
                features: import("@prisma-master/client/runtime/client").JsonValue | null;
                metadata: import("@prisma-master/client/runtime/client").JsonValue | null;
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
        profile: import("@prisma-master/client/runtime/client").JsonValue | null;
        settings: import("@prisma-master/client/runtime/client").JsonValue | null;
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
        profile: import("@prisma-master/client/runtime/client").JsonValue | null;
        settings: import("@prisma-master/client/runtime/client").JsonValue | null;
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
        profile: import("@prisma-master/client/runtime/client").JsonValue | null;
        settings: import("@prisma-master/client/runtime/client").JsonValue | null;
        id: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    uploadLogo(id: string, file: Express.Multer.File): Promise<{
        type: string;
        name: string;
        domain: string | null;
        databaseUrl: string | null;
        isActive: boolean;
        profile: import("@prisma-master/client/runtime/client").JsonValue | null;
        settings: import("@prisma-master/client/runtime/client").JsonValue | null;
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
