import { AssignFeeDto, StudentFeeAssignmentQueryOptionsDto } from '../../dto/assign-fee.dto';
import { StudentFeeAssignmentsService } from '../../services/student-fee-assignments/student-fee-assignments.service';
export declare class StudentFeeAssignmentsController {
    private readonly studentFeeAssignmentsService;
    constructor(studentFeeAssignmentsService: StudentFeeAssignmentsService);
    assignFee(assignDto: AssignFeeDto): Promise<{
        items: {
            id: string;
            description: string;
            amount: number;
            invoiceId: string;
            feeStructureId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        dueDate: Date;
        studentId: string;
        issueDate: Date;
        discount: number;
        invoiceNumber: string;
        totalAmount: number;
        paidAmount: number;
        discountId: string | null;
    }>;
    findAll(queryOptions: StudentFeeAssignmentQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
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
            status: string;
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
        };
        feeDiscount: {
            name: string;
            type: string;
            value: number;
        } | null;
        items: {
            id: string;
            description: string;
            amount: number;
            invoiceId: string;
            feeStructureId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        dueDate: Date;
        studentId: string;
        issueDate: Date;
        discount: number;
        invoiceNumber: string;
        totalAmount: number;
        paidAmount: number;
        discountId: string | null;
    }>>;
    findOne(id: string): Promise<{
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
            status: string;
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
        };
        feeDiscount: {
            id: string;
            name: string;
            type: string;
            value: number;
        } | null;
        items: ({
            feeStructure: {
                name: string;
            } | null;
        } & {
            id: string;
            description: string;
            amount: number;
            invoiceId: string;
            feeStructureId: string | null;
        })[];
        payments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            remarks: string | null;
            amount: number;
            receiptNumber: string;
            paymentDate: Date;
            paymentMethod: string;
            reference: string | null;
            invoiceId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        dueDate: Date;
        studentId: string;
        issueDate: Date;
        discount: number;
        invoiceNumber: string;
        totalAmount: number;
        paidAmount: number;
        discountId: string | null;
    }>;
}
