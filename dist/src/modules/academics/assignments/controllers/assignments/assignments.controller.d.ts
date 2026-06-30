import { AssignmentQueryOptionsDto, CreateAssignmentDto, UpdateAssignmentDto } from '../../dto/assignment.dto';
import { AssignmentsService } from '../../services/assignments/assignments.service';
export declare class AssignmentsController {
    private readonly assignmentsService;
    constructor(assignmentsService: AssignmentsService);
    create(createDto: CreateAssignmentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        description: string | null;
        title: string;
        dueDate: Date;
        maxMarks: number | null;
        staffId: string;
        courseId: string | null;
        batchId: string | null;
        subjectId: string;
    }>;
    findAll(queryOptions: AssignmentQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        staff: {
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
            status: string;
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            branchId: string | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
            employeeId: string | null;
            department: string | null;
            designation: string | null;
            joiningDate: Date | null;
        };
        subject: {
            name: string;
            code: string | null;
        };
        batch: {
            name: string;
        } | null;
        _count: {
            submissions: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        description: string | null;
        title: string;
        dueDate: Date;
        maxMarks: number | null;
        staffId: string;
        courseId: string | null;
        batchId: string | null;
        subjectId: string;
    }>>;
    findOne(id: string): Promise<{
        staff: {
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
            status: string;
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            branchId: string | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
            employeeId: string | null;
            department: string | null;
            designation: string | null;
            joiningDate: Date | null;
        };
        subject: {
            name: string;
            code: string | null;
        };
        course: {
            name: string;
        } | null;
        batch: {
            name: string;
        } | null;
        submissions: ({
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
                status: string;
                profile: import("@prisma/client/runtime/client").JsonValue | null;
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
                status: string;
                profile: import("@prisma/client/runtime/client").JsonValue | null;
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
            submittedAt: Date;
            marksObtained: number | null;
            feedback: string | null;
            gradedById: string | null;
            gradedAt: Date | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        description: string | null;
        title: string;
        dueDate: Date;
        maxMarks: number | null;
        staffId: string;
        courseId: string | null;
        batchId: string | null;
        subjectId: string;
    }>;
    update(id: string, updateDto: UpdateAssignmentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        description: string | null;
        title: string;
        dueDate: Date;
        maxMarks: number | null;
        staffId: string;
        courseId: string | null;
        batchId: string | null;
        subjectId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        description: string | null;
        title: string;
        dueDate: Date;
        maxMarks: number | null;
        staffId: string;
        courseId: string | null;
        batchId: string | null;
        subjectId: string;
    }>;
}
