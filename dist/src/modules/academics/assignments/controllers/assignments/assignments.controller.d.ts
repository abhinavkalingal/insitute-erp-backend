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
        staffId: string;
        subjectId: string;
        courseId: string | null;
        batchId: string | null;
        maxMarks: number | null;
    }>;
    findAll(queryOptions: AssignmentQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        _count: {
            submissions: number;
        };
        staff: {
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
        };
        subject: {
            name: string;
            code: string | null;
        };
        batch: {
            name: string;
        } | null;
    } & {
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
    }>>;
    findOne(id: string): Promise<{
        staff: {
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
        })[];
    } & {
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
    }>;
    update(id: string, updateDto: UpdateAssignmentDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
