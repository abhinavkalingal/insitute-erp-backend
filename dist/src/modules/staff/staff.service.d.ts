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
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string;
            passwordHash: string;
            firstName: string;
            lastName: string | null;
            isEmailVerified: boolean;
            resetPasswordToken: string | null;
            resetPasswordExpires: Date | null;
            emailVerificationToken: string | null;
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
    }>;
    findAll(queryOptions: StaffQueryOptionsDto): Promise<PageDto<{
        branch: {
            id: string;
            name: string;
        } | null;
        user: {
            id: string;
            isActive: boolean;
            email: string;
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
    }>>;
    findOne(id: string): Promise<{
        branch: {
            id: string;
            name: string;
        } | null;
        user: {
            id: string;
            isActive: boolean;
            email: string;
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
    }>;
    update(id: string, updateStaffDto: UpdateStaffDto): Promise<{
        user: {
            email: string;
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
    }>;
    uploadDocument(id: string, documentUrl: string, originalName: string, mimetype: string): Promise<{
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
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
