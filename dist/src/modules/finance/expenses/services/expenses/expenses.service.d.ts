import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { CreateExpenseDto, ExpenseQueryOptionsDto, UpdateExpenseDto } from '../../dto/expense.dto';
export declare class ExpensesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateExpenseDto): Promise<{
        vendor: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            address: string | null;
            contactName: string | null;
            phone: string | null;
        } | null;
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        status: string;
        categoryId: string;
        amount: number;
        vendorId: string | null;
        expenseDate: Date;
        billUrl: string | null;
        referenceNumber: string | null;
    }>;
    findAll(queryOptions: ExpenseQueryOptionsDto): Promise<PageDto<{
        vendor: {
            name: string;
        } | null;
        category: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        status: string;
        categoryId: string;
        amount: number;
        vendorId: string | null;
        expenseDate: Date;
        billUrl: string | null;
        referenceNumber: string | null;
    }>>;
    findOne(id: string): Promise<{
        vendor: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            address: string | null;
            contactName: string | null;
            phone: string | null;
        } | null;
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        status: string;
        categoryId: string;
        amount: number;
        vendorId: string | null;
        expenseDate: Date;
        billUrl: string | null;
        referenceNumber: string | null;
    }>;
    update(id: string, updateDto: UpdateExpenseDto): Promise<{
        vendor: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            address: string | null;
            contactName: string | null;
            phone: string | null;
        } | null;
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        status: string;
        categoryId: string;
        amount: number;
        vendorId: string | null;
        expenseDate: Date;
        billUrl: string | null;
        referenceNumber: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        status: string;
        categoryId: string;
        amount: number;
        vendorId: string | null;
        expenseDate: Date;
        billUrl: string | null;
        referenceNumber: string | null;
    }>;
    getReport(startDate?: string, endDate?: string): Promise<{
        period: {
            startDate: string | undefined;
            endDate: string | undefined;
        };
        totalExpenses: number;
        byCategory: {
            categoryId: string;
            categoryName: string;
            totalAmount: number;
        }[];
    }>;
}
