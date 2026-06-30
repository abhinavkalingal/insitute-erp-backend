import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaMasterService } from "../../../../../infrastructure/database/prisma-master.service";
import { Prisma } from '@prisma-master/client';
import { GenerateSaasInvoiceDto, SaasInvoiceQueryOptionsDto } from '../../dto/saas-invoice.dto';
export declare class SaasInvoicesService {
    private readonly prisma;
    private readonly TAX_RATE;
    constructor(prisma: PrismaMasterService);
    private generateInvoiceNumber;
    generateInvoice(instituteId: string, generateDto: GenerateSaasInvoiceDto): Promise<{
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
    }>;
    findAll(instituteId: string | null, queryOptions: SaasInvoiceQueryOptionsDto): Promise<PageDto<{
        institute: {
            name: string;
        };
    } & {
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
        subscription: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            instituteId: string;
            planId: string;
            status: string;
            billingCycle: string;
            currentPeriodEnd: Date;
            cancelAtPeriodEnd: boolean;
        } | null;
        payments: {
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
        }[];
    } & {
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
    }>;
    voidInvoice(id: string): Promise<{
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
    }>;
}
