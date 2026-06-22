import { CreateExpenseDto, ExpenseQueryOptionsDto, UpdateExpenseDto } from '../../dto/expense.dto';
import { ExpensesService } from '../../services/expenses/expenses.service';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    create(createDto: CreateExpenseDto): Promise<{
        vendor: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string | null;
            address: string | null;
            contactName: string | null;
            phone: string | null;
        } | null;
        category: {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
    } & {
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
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
    findAll(queryOptions: ExpenseQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        vendor: {
            name: string;
        } | null;
        category: {
            name: string;
        };
    } & {
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
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
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string | null;
            address: string | null;
            contactName: string | null;
            phone: string | null;
        } | null;
        category: {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
    } & {
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
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
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string | null;
            address: string | null;
            contactName: string | null;
            phone: string | null;
        } | null;
        category: {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
    } & {
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
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
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        status: string;
        categoryId: string;
        amount: number;
        vendorId: string | null;
        expenseDate: Date;
        billUrl: string | null;
        referenceNumber: string | null;
    }>;
}
