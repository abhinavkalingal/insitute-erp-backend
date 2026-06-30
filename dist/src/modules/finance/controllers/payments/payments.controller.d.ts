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
        receiptNumber: string;
        paymentDate: Date;
        paymentMethod: string;
        reference: string | null;
        invoiceId: string;
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
        receiptNumber: string;
        paymentDate: Date;
        paymentMethod: string;
        reference: string | null;
        invoiceId: string;
    }>>;
    findOne(id: string): Promise<{
        invoice: {
            student: {
                user: {
                    id: string;
                    email: string;
                    passwordHash: string;
                    firstName: string;
                    lastName: string | null;
                    isActive: boolean;
                    isEmailVerified: boolean;
                    resetPasswordToken: string | null;
                    resetPasswordExpires: Date | null;
                    emailVerificationToken: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
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
        receiptNumber: string;
        paymentDate: Date;
        paymentMethod: string;
        reference: string | null;
        invoiceId: string;
    }>;
}
