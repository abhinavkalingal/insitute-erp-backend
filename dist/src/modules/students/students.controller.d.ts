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
        profile: import("@prisma/client/runtime/client").JsonValue | null;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
        documents: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    findAll(queryOptions: StudentQueryOptionsDto): Promise<import("../../core/utils/pagination/page.dto").PageDto<{
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
                profile: import("@prisma/client/runtime/client").JsonValue | null;
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
        profile: import("@prisma/client/runtime/client").JsonValue | null;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
        documents: import("@prisma/client/runtime/client").JsonValue | null;
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
                profile: import("@prisma/client/runtime/client").JsonValue | null;
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
        profile: import("@prisma/client/runtime/client").JsonValue | null;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
        documents: import("@prisma/client/runtime/client").JsonValue | null;
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
        profile: import("@prisma/client/runtime/client").JsonValue | null;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
        documents: import("@prisma/client/runtime/client").JsonValue | null;
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
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        status: string;
        profile: import("@prisma/client/runtime/client").JsonValue | null;
        courseId: string | null;
        batchId: string | null;
        branchId: string | null;
        enrollmentNo: string | null;
        admissionDate: Date | null;
        documents: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
