import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { AssignmentQueryOptionsDto, CreateAssignmentDto, UpdateAssignmentDto } from '../../dto/assignment.dto';
export declare class AssignmentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(staffId: string, createDto: CreateAssignmentDto): Promise<{
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
    findAll(queryOptions: AssignmentQueryOptionsDto): Promise<PageDto<{
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
