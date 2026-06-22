import { CreateSubmissionDto, GradeSubmissionDto, SubmissionQueryOptionsDto } from '../../dto/submission.dto';
import { SubmissionsService } from '../../services/submissions/submissions.service';
export declare class SubmissionsController {
    private readonly submissionsService;
    constructor(submissionsService: SubmissionsService);
    submit(createDto: CreateSubmissionDto): Promise<{
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
    grade(id: string, gradeDto: GradeSubmissionDto): Promise<{
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
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            status: string;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
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
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            status: string;
            branchId: string | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
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
    findAll(queryOptions: SubmissionQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
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
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            status: string;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
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
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            status: string;
            branchId: string | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
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
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            status: string;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
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
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            status: string;
            branchId: string | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
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
