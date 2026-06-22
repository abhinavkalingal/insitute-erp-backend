import { InitiateSaasPaymentDto, SaasPaymentQueryOptionsDto, UpdateSaasPaymentStatusDto } from '../../dto/saas-payment.dto';
import { SaasPaymentsService } from '../../services/saas-payments/saas-payments.service';
export declare class SaasPaymentsController {
    private readonly saasPaymentsService;
    constructor(saasPaymentsService: SaasPaymentsService);
    initiatePayment(instituteId: string, initiateDto: InitiateSaasPaymentDto): Promise<{
        id: string;
        createdAt: Date;
        instituteId: string;
        status: string;
        amount: number;
        invoiceId: string | null;
        paymentMethod: string | null;
        gatewayOrderId: string | null;
        currency: string;
        transactionId: string | null;
        metadata: import("@prisma-master/client/runtime/client").JsonValue | null;
    }>;
    updatePaymentStatus(id: string, updateDto: UpdateSaasPaymentStatusDto): Promise<{
        id: string;
        createdAt: Date;
        instituteId: string;
        status: string;
        amount: number;
        invoiceId: string | null;
        paymentMethod: string | null;
        gatewayOrderId: string | null;
        currency: string;
        transactionId: string | null;
        metadata: import("@prisma-master/client/runtime/client").JsonValue | null;
    }>;
    findAll(instituteId: string, queryOptions: SaasPaymentQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        institute: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        instituteId: string;
        status: string;
        amount: number;
        invoiceId: string | null;
        paymentMethod: string | null;
        gatewayOrderId: string | null;
        currency: string;
        transactionId: string | null;
        metadata: import("@prisma-master/client/runtime/client").JsonValue | null;
    }>>;
    findOne(id: string): Promise<{
        institute: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            isActive: boolean;
            deletedAt: Date | null;
            databaseUrl: string | null;
            domain: string | null;
            logoUrl: string | null;
            profile: import("@prisma-master/client/runtime/client").JsonValue | null;
            settings: import("@prisma-master/client/runtime/client").JsonValue | null;
        };
        invoice: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            instituteId: string;
            status: string;
            dueDate: Date | null;
            amount: number;
            subscriptionId: string | null;
            pdfUrl: string | null;
            issuedAt: Date;
            paidAt: Date | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        instituteId: string;
        status: string;
        amount: number;
        invoiceId: string | null;
        paymentMethod: string | null;
        gatewayOrderId: string | null;
        currency: string;
        transactionId: string | null;
        metadata: import("@prisma-master/client/runtime/client").JsonValue | null;
    }>;
}
