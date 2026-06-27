import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { AssignFeeDto, StudentFeeAssignmentQueryOptionsDto } from '../../dto/assign-fee.dto';
export declare class StudentFeeAssignmentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    assignFee(assignDto: AssignFeeDto): Promise<{
        items: {
            id: string;
            description: string;
            amount: number;
            feeStructureId: string | null;
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
    findAll(queryOptions: StudentFeeAssignmentQueryOptionsDto): Promise<PageDto<{
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
        feeDiscount: {
            value: number;
            name: string;
            type: string;
        } | null;
        items: {
            id: string;
            description: string;
            amount: number;
            feeStructureId: string | null;
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
    }>>;
    findOne(id: string): Promise<{
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
        feeDiscount: {
            value: number;
            id: string;
            name: string;
            type: string;
        } | null;
        items: ({
            feeStructure: {
                name: string;
            } | null;
        } & {
            id: string;
            description: string;
            amount: number;
            feeStructureId: string | null;
            invoiceId: string;
        })[];
        payments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            remarks: string | null;
            amount: number;
            invoiceId: string;
            paymentDate: Date;
            paymentMethod: string;
            reference: string | null;
            receiptNumber: string;
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
