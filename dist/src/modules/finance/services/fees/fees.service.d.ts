import { PageDto } from "../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { CreateFeeCategoryDto, CreateFeeStructureDto, FeeCategoryQueryOptionsDto, FeeStructureQueryOptionsDto, UpdateFeeCategoryDto, UpdateFeeStructureDto } from '../../dto/fee.dto';
export declare class FeesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createCategory(createDto: CreateFeeCategoryDto): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    findAllCategories(queryOptions: FeeCategoryQueryOptionsDto): Promise<PageDto<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>>;
    findOneCategory(id: string): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    updateCategory(id: string, updateDto: UpdateFeeCategoryDto): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    removeCategory(id: string): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    createStructure(createDto: CreateFeeStructureDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        courseId: string | null;
        batchId: string | null;
        categoryId: string;
        amount: number;
    }>;
    findAllStructures(queryOptions: FeeStructureQueryOptionsDto): Promise<PageDto<{
        course: {
            name: string;
        } | null;
        batch: {
            name: string;
        } | null;
        category: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        courseId: string | null;
        batchId: string | null;
        categoryId: string;
        amount: number;
    }>>;
    findOneStructure(id: string): Promise<{
        course: {
            name: string;
        } | null;
        batch: {
            name: string;
        } | null;
        category: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        courseId: string | null;
        batchId: string | null;
        categoryId: string;
        amount: number;
    }>;
    updateStructure(id: string, updateDto: UpdateFeeStructureDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        courseId: string | null;
        batchId: string | null;
        categoryId: string;
        amount: number;
    }>;
    removeStructure(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        courseId: string | null;
        batchId: string | null;
        categoryId: string;
        amount: number;
    }>;
}
