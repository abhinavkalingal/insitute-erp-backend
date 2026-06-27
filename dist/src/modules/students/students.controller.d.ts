import { StorageService } from "../storage/storage.service";
import { CreateStudentDto } from './dto/create-student.dto';
import { LinkGuardianDto } from './dto/link-guardian.dto';
import { StudentQueryOptionsDto } from './dto/student-query-options.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsService } from './students.service';
export declare class StudentsController {
    private readonly studentsService;
    private readonly storageService;
    constructor(studentsService: StudentsService, storageService: StorageService);
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
        profile: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        documents: import("@prisma/client/runtime/client").JsonValue | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
    }>;
    findAll(queryOptions: StudentQueryOptionsDto): Promise<import("../../core/utils/pagination/page.dto").PageDto<{
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
                profile: import("@prisma/client/runtime/client").JsonValue | null;
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
        profile: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        documents: import("@prisma/client/runtime/client").JsonValue | null;
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
                profile: import("@prisma/client/runtime/client").JsonValue | null;
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
        profile: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        documents: import("@prisma/client/runtime/client").JsonValue | null;
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
        profile: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        documents: import("@prisma/client/runtime/client").JsonValue | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
    }>;
    linkGuardian(id: string, linkGuardianDto: LinkGuardianDto): Promise<{
        message: string;
        link: {
            createdAt: Date;
            studentId: string;
            guardianId: string;
            relationship: string;
            isPrimary: boolean;
        };
    }>;
    uploadDocument(id: string, file: Express.Multer.File): Promise<{
        id: string;
        profile: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        documents: import("@prisma/client/runtime/client").JsonValue | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
