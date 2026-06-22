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
        id: string;
        name: string;
        databaseUrl: string | null;
        domain: string | null;
        logoUrl: string | null;
        profile: import("@prisma-master/client/runtime/client").JsonValue | null;
        settings: import("@prisma-master/client/runtime/client").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    findAll(queryOptions: InstituteQueryOptionsDto): Promise<import("../../core/utils/pagination/page.dto").PageDto<{
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
        profile: import("@prisma-master/client/runtime/client").JsonValue | null;
        settings: import("@prisma-master/client/runtime/client").JsonValue | null;
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
        profile: import("@prisma-master/client/runtime/client").JsonValue | null;
        settings: import("@prisma-master/client/runtime/client").JsonValue | null;
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
        profile: import("@prisma-master/client/runtime/client").JsonValue | null;
        settings: import("@prisma-master/client/runtime/client").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    uploadLogo(id: string, file: Express.Multer.File): Promise<{
        id: string;
        name: string;
        databaseUrl: string | null;
        domain: string | null;
        logoUrl: string | null;
        profile: import("@prisma-master/client/runtime/client").JsonValue | null;
        settings: import("@prisma-master/client/runtime/client").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
