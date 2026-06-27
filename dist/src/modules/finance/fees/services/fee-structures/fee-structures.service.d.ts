import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { CreateFeeStructureDto, FeeStructureQueryOptionsDto, UpdateFeeStructureDto } from '../../dto/fee-structure.dto';
export declare class FeeStructuresService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        courseId: string | null;
        batchId: string | null;
        categoryId: string;
        amount: number;
    }>;
    findAll(queryOptions: FeeStructureQueryOptionsDto): Promise<PageDto<{
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        courseId: string | null;
        batchId: string | null;
        categoryId: string;
        amount: number;
    }>>;
    findOne(id: string): Promise<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        courseId: string | null;
        batchId: string | null;
        categoryId: string;
        amount: number;
    }>;
    remove(id: string): Promise<{
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
