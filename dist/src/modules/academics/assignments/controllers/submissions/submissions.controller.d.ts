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
        submittedAt: Date;
        marksObtained: number | null;
        feedback: string | null;
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
        };
        gradedBy: ({
            user: {
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
            branchId: string | null;
            employeeId: string | null;
            department: string | null;
            designation: string | null;
            joiningDate: Date | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
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
    findAll(queryOptions: SubmissionQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        student: {
            user: {
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
            profile: import("@prisma/client/runtime/client").JsonValue | null;
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
            documents: import("@prisma/client/runtime/client").JsonValue | null;
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
            profile: import("@prisma/client/runtime/client").JsonValue | null;
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
            documents: import("@prisma/client/runtime/client").JsonValue | null;
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
