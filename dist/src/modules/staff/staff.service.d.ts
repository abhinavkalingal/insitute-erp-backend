import { PageDto } from "../../core/utils/pagination/page.dto";
import { PrismaService } from "../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffQueryOptionsDto } from './dto/staff-query-options.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
export declare class StaffService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createStaffDto: CreateStaffDto): Promise<{
        user: {
            id: string;
            email: string;
            passwordHash: string;
            firstName: string;
            lastName: string | null;
            isActive: boolean;
            isEmailVerified: boolean;
            resetPasswordToken: string | null;
            resetPasswordExpires: Date | null;
            emailVerificationToken: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        profile: Prisma.JsonValue | null;
        branchId: string | null;
        documents: Prisma.JsonValue | null;
        employeeId: string | null;
        department: string | null;
        designation: string | null;
        joiningDate: Date | null;
    }>;
    findAll(queryOptions: StaffQueryOptionsDto): Promise<PageDto<{
        branch: {
            id: string;
            name: string;
        } | null;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        profile: Prisma.JsonValue | null;
        branchId: string | null;
        documents: Prisma.JsonValue | null;
        employeeId: string | null;
        department: string | null;
        designation: string | null;
        joiningDate: Date | null;
    }>>;
    findOne(id: string): Promise<{
        branch: {
            id: string;
            name: string;
        } | null;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        profile: Prisma.JsonValue | null;
        branchId: string | null;
        documents: Prisma.JsonValue | null;
        employeeId: string | null;
        department: string | null;
        designation: string | null;
        joiningDate: Date | null;
    }>;
    update(id: string, updateStaffDto: UpdateStaffDto): Promise<{
        user: {
            email: string;
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
        profile: Prisma.JsonValue | null;
        branchId: string | null;
        documents: Prisma.JsonValue | null;
        employeeId: string | null;
        department: string | null;
        designation: string | null;
        joiningDate: Date | null;
    }>;
    uploadDocument(id: string, documentUrl: string, originalName: string, mimetype: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        profile: Prisma.JsonValue | null;
        branchId: string | null;
        documents: Prisma.JsonValue | null;
        employeeId: string | null;
        department: string | null;
        designation: string | null;
        joiningDate: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
