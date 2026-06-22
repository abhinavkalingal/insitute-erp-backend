import { CreateFeeStructureDto, FeeStructureQueryOptionsDto, UpdateFeeStructureDto } from '../../dto/fee-structure.dto';
import { FeeStructuresService } from '../../services/fee-structures/fee-structures.service';
export declare class FeeStructuresController {
    private readonly feeStructuresService;
    constructor(feeStructuresService: FeeStructuresService);
    create(createDto: CreateFeeStructureDto): Promise<{
        installments: {
            id: string;
            name: string;
            dueDate: Date;
            percentage: number | null;
            amount: number | null;
            feeStructureId: string;
        }[];
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
    findAll(queryOptions: FeeStructureQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        category: {
            name: string;
        };
        installments: {
            id: string;
            name: string;
            dueDate: Date;
            percentage: number | null;
            amount: number | null;
            feeStructureId: string;
        }[];
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
    findOne(id: string): Promise<{
        category: {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        installments: {
            id: string;
            name: string;
            dueDate: Date;
            percentage: number | null;
            amount: number | null;
            feeStructureId: string;
        }[];
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
    update(id: string, updateDto: UpdateFeeStructureDto): Promise<{
        installments: {
            id: string;
            name: string;
            dueDate: Date;
            percentage: number | null;
            amount: number | null;
            feeStructureId: string;
        }[];
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
    remove(id: string): Promise<{
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
