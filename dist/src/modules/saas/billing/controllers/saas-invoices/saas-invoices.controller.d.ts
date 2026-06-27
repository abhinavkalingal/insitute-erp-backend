import { GenerateSaasInvoiceDto, SaasInvoiceQueryOptionsDto } from '../../dto/saas-invoice.dto';
import { SaasInvoicesService } from '../../services/saas-invoices/saas-invoices.service';
export declare class SaasInvoicesController {
    private readonly saasInvoicesService;
    constructor(saasInvoicesService: SaasInvoicesService);
    generateInvoice(instituteId: string, generateDto: GenerateSaasInvoiceDto): Promise<{
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
    }>;
    findAll(req: any, queryOptions: SaasInvoiceQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        institute: {
            name: string;
        };
    } & {
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
    }>>;
    findOne(id: string): Promise<{
        institute: {
            id: string;
            name: string;
            databaseUrl: string | null;
            domain: string | null;
            logoUrl: string | null;
            profile: import("@prisma-master/client/runtime/client").JsonValue | null;
            settings: import("@prisma-master/client/runtime/client").JsonValue | null;
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
            amount: number;
            invoiceId: string | null;
            paymentMethod: string | null;
            gatewayOrderId: string | null;
            currency: string;
            transactionId: string | null;
            metadata: import("@prisma-master/client/runtime/client").JsonValue | null;
        }[];
    } & {
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
    }>;
    voidInvoice(id: string): Promise<{
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
    }>;
}
