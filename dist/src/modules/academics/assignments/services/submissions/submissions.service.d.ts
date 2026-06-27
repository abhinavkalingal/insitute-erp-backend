import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { CreateSubmissionDto, GradeSubmissionDto, SubmissionQueryOptionsDto } from '../../dto/submission.dto';
export declare class SubmissionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    submit(createDto: CreateSubmissionDto, studentId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        content: string | null;
        assignmentId: string;
        studentId: string;
        fileUrl: string | null;
        submittedAt: Date;
        marksObtained: number | null;
        feedback: string | null;
        gradedById: string | null;
        gradedAt: Date | null;
    }>;
    grade(submissionId: string, staffId: string, gradeDto: GradeSubmissionDto): Promise<{
        student: {
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
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            documents: Prisma.JsonValue | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
        };
        gradedBy: ({
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
        }) | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        content: string | null;
        assignmentId: string;
        studentId: string;
        fileUrl: string | null;
        submittedAt: Date;
        marksObtained: number | null;
        feedback: string | null;
        gradedById: string | null;
        gradedAt: Date | null;
    }>;
    findAll(queryOptions: SubmissionQueryOptionsDto): Promise<PageDto<{
        student: {
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
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            documents: Prisma.JsonValue | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
        };
        assignment: {
            title: string;
            maxMarks: number | null;
        };
        gradedBy: ({
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
        }) | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        content: string | null;
        assignmentId: string;
        studentId: string;
        fileUrl: string | null;
        submittedAt: Date;
        marksObtained: number | null;
        feedback: string | null;
        gradedById: string | null;
        gradedAt: Date | null;
    }>>;
    findOne(id: string): Promise<{
        student: {
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
        };
        assignment: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            description: string | null;
            title: string;
            dueDate: Date;
            staffId: string;
            subjectId: string;
            courseId: string | null;
            batchId: string | null;
            maxMarks: number | null;
        };
        gradedBy: ({
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
        }) | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        content: string | null;
        assignmentId: string;
        studentId: string;
        fileUrl: string | null;
        submittedAt: Date;
        marksObtained: number | null;
        feedback: string | null;
        gradedById: string | null;
        gradedAt: Date | null;
    }>;
}
