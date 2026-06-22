import { CreatePaymentDto, PaymentQueryOptionsDto } from '../../dto/payment.dto';
import { PaymentsService } from '../../services/payments/payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(createDto: CreatePaymentDto): Promise<{
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
    findAll(queryOptions: PaymentQueryOptionsDto): Promise<import("../../../../core/utils/pagination/page.dto").PageDto<{
        invoice: {
            student: {
                user: {
                    firstName: string;
                    lastName: string | null;
                };
            };
            invoiceNumber: string;
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
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    passwordHash: string;
                    firstName: string;
                    lastName: string | null;
                    isActive: boolean;
                    isEmailVerified: boolean;
                    deletedAt: Date | null;
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
