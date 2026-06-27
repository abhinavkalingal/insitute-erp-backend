import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { CreateMaterialDto, MaterialQueryOptionsDto, UpdateMaterialDto } from '../../dto/material.dto';
export declare class MaterialsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateMaterialDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        description: string | null;
        type: string;
        title: string;
        staffId: string;
        subjectId: string;
        courseId: string | null;
        batchId: string | null;
        fileUrl: string | null;
        categoryId: string;
        videoUrl: string | null;
    }>;
    findAll(queryOptions: MaterialQueryOptionsDto): Promise<PageDto<{
        staff: {
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            profile: Prisma.JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            branchId: string | null;
            employeeId: string | null;
            department: string | null;
            designation: string | null;
            joiningDate: Date | null;
            documents: Prisma.JsonValue | null;
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
        subjectId: string;
        courseId: string | null;
        batchId: string | null;
        fileUrl: string | null;
        categoryId: string;
        videoUrl: string | null;
    }>>;
    findOne(id: string): Promise<{
        staff: {
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            profile: Prisma.JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            branchId: string | null;
            employeeId: string | null;
            department: string | null;
            designation: string | null;
            joiningDate: Date | null;
            documents: Prisma.JsonValue | null;
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
            name: string;
            createdAt: Date;
            updatedAt: Date;
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
        subjectId: string;
        courseId: string | null;
        batchId: string | null;
        fileUrl: string | null;
        categoryId: string;
        videoUrl: string | null;
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
        subjectId: string;
        courseId: string | null;
        batchId: string | null;
        fileUrl: string | null;
        categoryId: string;
        videoUrl: string | null;
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
        subjectId: string;
        courseId: string | null;
        batchId: string | null;
        fileUrl: string | null;
        categoryId: string;
        videoUrl: string | null;
    }>;
}
