import { PageDto } from "../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { CreatePaymentDto, PaymentQueryOptionsDto } from '../../dto/payment.dto';
export declare class PaymentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private generateReceiptNumber;
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
    findAll(queryOptions: PaymentQueryOptionsDto): Promise<PageDto<{
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
                profile: Prisma.JsonValue | null;
                courseId: string | null;
                batchId: string | null;
                branchId: string | null;
                enrollmentNo: string | null;
                admissionDate: Date | null;
                documents: Prisma.JsonValue | null;
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
