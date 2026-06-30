import { PageDto } from "../../core/utils/pagination/page.dto";
import { PrismaService } from "../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { CreateStudentDto } from './dto/create-student.dto';
import { LinkGuardianDto } from './dto/link-guardian.dto';
import { StudentQueryOptionsDto } from './dto/student-query-options.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createStudentDto: CreateStudentDto): Promise<{
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
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
        documents: Prisma.JsonValue | null;
    }>;
    findAll(queryOptions: StudentQueryOptionsDto): Promise<PageDto<{
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
        guardians: ({
            guardian: {
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
                profile: Prisma.JsonValue | null;
            };
        } & {
            createdAt: Date;
            studentId: string;
            guardianId: string;
            relationship: string;
            isPrimary: boolean;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        profile: Prisma.JsonValue | null;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
        documents: Prisma.JsonValue | null;
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
        guardians: ({
            guardian: {
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
                profile: Prisma.JsonValue | null;
            };
        } & {
            createdAt: Date;
            studentId: string;
            guardianId: string;
            relationship: string;
            isPrimary: boolean;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        profile: Prisma.JsonValue | null;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
        documents: Prisma.JsonValue | null;
    }>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<{
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
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
        documents: Prisma.JsonValue | null;
    }>;
    linkGuardian(id: string, linkDto: LinkGuardianDto): Promise<{
        message: string;
        link: {
            createdAt: Date;
            studentId: string;
            guardianId: string;
            relationship: string;
            isPrimary: boolean;
        };
    }>;
    uploadDocument(id: string, documentUrl: string, originalName: string, mimetype: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        profile: Prisma.JsonValue | null;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
        documents: Prisma.JsonValue | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
