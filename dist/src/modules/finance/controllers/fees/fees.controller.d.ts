import { CreateFeeCategoryDto, CreateFeeStructureDto, FeeCategoryQueryOptionsDto, FeeStructureQueryOptionsDto, UpdateFeeCategoryDto, UpdateFeeStructureDto } from '../../dto/fee.dto';
import { FeesService } from '../../services/fees/fees.service';
export declare class FeesController {
    private readonly feesService;
    constructor(feesService: FeesService);
    createCategory(createDto: CreateFeeCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    findAllCategories(queryOptions: FeeCategoryQueryOptionsDto): Promise<import("../../../../core/utils/pagination/page.dto").PageDto<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>>;
    findOneCategory(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    updateCategory(id: string, updateDto: UpdateFeeCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    removeCategory(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    createStructure(createDto: CreateFeeStructureDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        courseId: string | null;
        batchId: string | null;
        categoryId: string;
        amount: number;
    }>;
    findAllStructures(queryOptions: FeeStructureQueryOptionsDto): Promise<import("../../../../core/utils/pagination/page.dto").PageDto<{
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        courseId: string | null;
        batchId: string | null;
        categoryId: string;
        amount: number;
    }>;
    updateStructure(id: string, updateDto: UpdateFeeStructureDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        courseId: string | null;
        batchId: string | null;
        categoryId: string;
        amount: number;
    }>;
    removeStructure(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        courseId: string | null;
        batchId: string | null;
        categoryId: string;
        amount: number;
    }>;
}
