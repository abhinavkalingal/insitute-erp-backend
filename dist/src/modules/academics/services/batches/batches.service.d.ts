import { PageDto } from "../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { BatchQueryOptionsDto, CreateBatchDto, UpdateBatchDto } from '../../dto/batch.dto';
export declare class BatchesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateBatchDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        courseId: string;
        branchId: string | null;
        academicYearId: string;
        capacity: number | null;
    }>;
    findAll(queryOptions: BatchQueryOptionsDto): Promise<PageDto<{
        branch: {
            name: string;
        } | null;
        academicYear: {
            name: string;
        };
        course: {
            name: string;
            code: string | null;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        courseId: string;
        branchId: string | null;
        academicYearId: string;
        capacity: number | null;
    }>>;
    findOne(id: string): Promise<{
        branch: {
            name: string;
        } | null;
        academicYear: {
            name: string;
        };
        course: {
            name: string;
            code: string | null;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        courseId: string;
        branchId: string | null;
        academicYearId: string;
        capacity: number | null;
    }>;
    update(id: string, updateDto: UpdateBatchDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        courseId: string;
        branchId: string | null;
        academicYearId: string;
        capacity: number | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        courseId: string;
        branchId: string | null;
        academicYearId: string;
        capacity: number | null;
    }>;
}
