import { PageDto } from "../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { CreateInvoiceDto, InvoiceQueryOptionsDto, UpdateInvoiceDto } from '../../dto/invoice.dto';
export declare class InvoicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private generateInvoiceNumber;
    create(createDto: CreateInvoiceDto): Promise<any>;
    findAll(queryOptions: InvoiceQueryOptionsDto): Promise<PageDto<{
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
    }>>;
    findOne(id: string, tx?: any): Promise<any>;
    update(id: string, updateDto: UpdateInvoiceDto): Promise<{
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
    remove(id: string): Promise<{
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
