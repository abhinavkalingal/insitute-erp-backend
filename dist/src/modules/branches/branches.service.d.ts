import { SaasEnforcementService } from "../../core/services/saas-enforcement.service";
import { PageDto } from "../../core/utils/pagination/page.dto";
import { PrismaService } from "../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { BranchQueryOptionsDto } from './dto/branch-query-options.dto';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
export declare class BranchesService {
    private readonly prisma;
    private readonly saasEnforcement;
    constructor(prisma: PrismaService, saasEnforcement: SaasEnforcementService);
    create(instituteId: string, createBranchDto: CreateBranchDto): Promise<{
        id: string;
        name: string;
        settings: Prisma.JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        address: Prisma.JsonValue | null;
    }>;
    findAll(queryOptions: BranchQueryOptionsDto): Promise<PageDto<{
        id: string;
        name: string;
        settings: Prisma.JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        address: Prisma.JsonValue | null;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        settings: Prisma.JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        address: Prisma.JsonValue | null;
    }>;
    update(id: string, updateBranchDto: UpdateBranchDto): Promise<{
        id: string;
        name: string;
        settings: Prisma.JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        address: Prisma.JsonValue | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
