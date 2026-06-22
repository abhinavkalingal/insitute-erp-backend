import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { CreateMaterialDto, MaterialQueryOptionsDto, UpdateMaterialDto } from '../../dto/material.dto';
export declare class MaterialsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateMaterialDto): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            profile: Prisma.JsonValue | null;
            status: string;
            branchId: string | null;
            documents: Prisma.JsonValue | null;
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
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            profile: Prisma.JsonValue | null;
            status: string;
            branchId: string | null;
            documents: Prisma.JsonValue | null;
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
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
    } & {
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
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
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
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
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
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
