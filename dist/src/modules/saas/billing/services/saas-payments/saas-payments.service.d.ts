import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaMasterService } from "../../../../../infrastructure/database/prisma-master.service";
import { Prisma } from '@prisma-master/client';
import { PaymentGatewayService } from '../../../payment-gateway/services/payment-gateway/payment-gateway.service';
import { InitiateSaasPaymentDto, SaasPaymentQueryOptionsDto, UpdateSaasPaymentStatusDto } from '../../dto/saas-payment.dto';
export declare class SaasPaymentsService {
    private readonly prisma;
    private readonly paymentGateway;
    constructor(prisma: PrismaMasterService, paymentGateway: PaymentGatewayService);
    initiatePayment(instituteId: string, initiateDto: InitiateSaasPaymentDto): Promise<{
        id: string;
        createdAt: Date;
        instituteId: string;
        status: string;
        metadata: Prisma.JsonValue | null;
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
        metadata: Prisma.JsonValue | null;
        invoiceId: string | null;
        gatewayOrderId: string | null;
        amount: number;
        currency: string;
        paymentMethod: string | null;
        transactionId: string | null;
    }>;
    findAll(instituteId: string, queryOptions: SaasPaymentQueryOptionsDto): Promise<PageDto<{
        institute: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        instituteId: string;
        status: string;
        metadata: Prisma.JsonValue | null;
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
            profile: Prisma.JsonValue | null;
            settings: Prisma.JsonValue | null;
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
        metadata: Prisma.JsonValue | null;
        invoiceId: string | null;
        gatewayOrderId: string | null;
        amount: number;
        currency: string;
        paymentMethod: string | null;
        transactionId: string | null;
    }>;
}
