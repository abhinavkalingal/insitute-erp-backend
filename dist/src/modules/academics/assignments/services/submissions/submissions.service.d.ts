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
        marksObtained: number | null;
        feedback: string | null;
        submittedAt: Date;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            profile: Prisma.JsonValue | null;
            status: string;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
            documents: Prisma.JsonValue | null;
        };
        gradedBy: ({
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
        marksObtained: number | null;
        feedback: string | null;
        submittedAt: Date;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            profile: Prisma.JsonValue | null;
            status: string;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
            documents: Prisma.JsonValue | null;
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
        marksObtained: number | null;
        feedback: string | null;
        submittedAt: Date;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            profile: Prisma.JsonValue | null;
            status: string;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
            documents: Prisma.JsonValue | null;
        };
        assignment: {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
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
        marksObtained: number | null;
        feedback: string | null;
        submittedAt: Date;
        gradedById: string | null;
        gradedAt: Date | null;
    }>;
}
