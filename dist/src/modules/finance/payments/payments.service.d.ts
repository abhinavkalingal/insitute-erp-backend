import { PageDto } from "../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { CollectPaymentDto, PaymentQueryOptionsDto } from './dto/create-payment.dto';
export declare class PaymentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    collectPayment(collectDto: CollectPaymentDto): Promise<{
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
    }>;
    refundPayment(id: string): Promise<{
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
    }>;
    findAll(queryOptions: PaymentQueryOptionsDto): Promise<PageDto<{
        invoice: {
            invoiceNumber: string;
            totalAmount: number;
        };
    } & {
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
    }>>;
    findOne(id: string): Promise<{
        invoice: {
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
        };
    } & {
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
    }>;
}
