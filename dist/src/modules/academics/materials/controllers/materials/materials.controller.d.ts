import { CreateMaterialDto, MaterialQueryOptionsDto, UpdateMaterialDto } from '../../dto/material.dto';
import { MaterialsService } from '../../services/materials/materials.service';
export declare class MaterialsController {
    private readonly materialsService;
    constructor(materialsService: MaterialsService);
    create(createDto: CreateMaterialDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        description: string | null;
        type: string;
        title: string;
        staffId: string;
        courseId: string | null;
        batchId: string | null;
        subjectId: string;
        fileUrl: string | null;
        videoUrl: string | null;
        categoryId: string;
    }>;
    findAll(queryOptions: MaterialQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        staff: {
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            branchId: string | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
            employeeId: string | null;
            department: string | null;
            designation: string | null;
            joiningDate: Date | null;
        };
        subject: {
            name: string;
        };
        category: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        description: string | null;
        type: string;
        title: string;
        staffId: string;
        courseId: string | null;
        batchId: string | null;
        subjectId: string;
        fileUrl: string | null;
        videoUrl: string | null;
        categoryId: string;
    }>>;
    findOne(id: string): Promise<{
        staff: {
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            branchId: string | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
            employeeId: string | null;
            department: string | null;
            designation: string | null;
            joiningDate: Date | null;
        };
        subject: {
            name: string;
            code: string | null;
        };
        course: {
            name: string;
        } | null;
        batch: {
            name: string;
        } | null;
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        description: string | null;
        type: string;
        title: string;
        staffId: string;
        courseId: string | null;
        batchId: string | null;
        subjectId: string;
        fileUrl: string | null;
        videoUrl: string | null;
        categoryId: string;
    }>;
    update(id: string, updateDto: UpdateMaterialDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        description: string | null;
        type: string;
        title: string;
        staffId: string;
        courseId: string | null;
        batchId: string | null;
        subjectId: string;
        fileUrl: string | null;
        videoUrl: string | null;
        categoryId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        description: string | null;
        type: string;
        title: string;
        staffId: string;
        courseId: string | null;
        batchId: string | null;
        subjectId: string;
        fileUrl: string | null;
        videoUrl: string | null;
        categoryId: string;
    }>;
}
