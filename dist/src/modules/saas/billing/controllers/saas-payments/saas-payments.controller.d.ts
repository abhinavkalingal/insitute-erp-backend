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
        metadata: import("@prisma-master/client/runtime/client").JsonValue | null;
        invoiceId: string | null;
        gatewayOrderId: string | null;
        amount: number;
        currency: string;
        paymentMethod: string | null;
        transactionId: string | null;
    }>;
    updatePaymentStatus(id: string, updateDto: UpdateSaasPaymentStatusDto): Promise<{
        id: string;
        createdAt: Date;
        instituteId: string;
        status: string;
        metadata: import("@prisma-master/client/runtime/client").JsonValue | null;
        invoiceId: string | null;
        gatewayOrderId: string | null;
        amount: number;
        currency: string;
        paymentMethod: string | null;
        transactionId: string | null;
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
        metadata: import("@prisma-master/client/runtime/client").JsonValue | null;
        invoiceId: string | null;
        gatewayOrderId: string | null;
        amount: number;
        currency: string;
        paymentMethod: string | null;
        transactionId: string | null;
    }>>;
    findOne(id: string): Promise<{
        institute: {
            id: string;
            name: string;
            databaseUrl: string | null;
            type: string;
            domain: string | null;
            logoUrl: string | null;
            profile: import("@prisma-master/client/runtime/client").JsonValue | null;
            settings: import("@prisma-master/client/runtime/client").JsonValue | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
        invoice: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            instituteId: string;
            status: string;
            amount: number;
            subscriptionId: string | null;
            pdfUrl: string | null;
            issuedAt: Date;
            dueDate: Date | null;
            paidAt: Date | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        instituteId: string;
        status: string;
        metadata: import("@prisma-master/client/runtime/client").JsonValue | null;
        invoiceId: string | null;
        gatewayOrderId: string | null;
        amount: number;
        currency: string;
        paymentMethod: string | null;
        transactionId: string | null;
    }>;
}
