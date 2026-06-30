import { BatchQueryOptionsDto, CreateBatchDto, UpdateBatchDto } from '../../dto/batch.dto';
import { BatchesService } from '../../services/batches/batches.service';
export declare class BatchesController {
    private readonly batchesService;
    constructor(batchesService: BatchesService);
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
    findAll(queryOptions: BatchQueryOptionsDto): Promise<import("../../../../core/utils/pagination/page.dto").PageDto<{
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
