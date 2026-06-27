import { BranchesService } from './branches.service';
import { BranchQueryOptionsDto } from './dto/branch-query-options.dto';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
export declare class BranchesController {
    private readonly branchesService;
    constructor(branchesService: BranchesService);
    create(instituteId: string, createBranchDto: CreateBranchDto): Promise<{
        id: string;
        name: string;
        settings: import("@prisma/client/runtime/client").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        address: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    findAll(queryOptions: BranchQueryOptionsDto): Promise<import("../../core/utils/pagination/page.dto").PageDto<{
        id: string;
        name: string;
        settings: import("@prisma/client/runtime/client").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        address: import("@prisma/client/runtime/client").JsonValue | null;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        settings: import("@prisma/client/runtime/client").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        address: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    update(id: string, updateBranchDto: UpdateBranchDto): Promise<{
        id: string;
        name: string;
        settings: import("@prisma/client/runtime/client").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        address: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
