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
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        documents: Prisma.JsonValue | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
    }>;
    findAll(queryOptions: StudentQueryOptionsDto): Promise<PageDto<{
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
        guardians: ({
            guardian: {
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
        profile: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        documents: Prisma.JsonValue | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
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
        guardians: ({
            guardian: {
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
        profile: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        documents: Prisma.JsonValue | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
    }>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<{
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
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        documents: Prisma.JsonValue | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
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
        profile: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        documents: Prisma.JsonValue | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
