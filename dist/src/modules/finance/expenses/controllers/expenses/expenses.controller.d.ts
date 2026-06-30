import { CreateExpenseDto, ExpenseQueryOptionsDto, UpdateExpenseDto } from '../../dto/expense.dto';
import { ExpensesService } from '../../services/expenses/expenses.service';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    create(createDto: CreateExpenseDto): Promise<{
        vendor: {
            id: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            address: string | null;
            contactName: string | null;
            phone: string | null;
        } | null;
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        title: string;
        categoryId: string;
        amount: number;
        expenseDate: Date;
        billUrl: string | null;
        referenceNumber: string | null;
        vendorId: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        title: string;
        categoryId: string;
        amount: number;
        expenseDate: Date;
        billUrl: string | null;
        referenceNumber: string | null;
        vendorId: string | null;
    }>>;
    findOne(id: string): Promise<{
        vendor: {
            id: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            address: string | null;
            contactName: string | null;
            phone: string | null;
        } | null;
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        title: string;
        categoryId: string;
        amount: number;
        expenseDate: Date;
        billUrl: string | null;
        referenceNumber: string | null;
        vendorId: string | null;
    }>;
    update(id: string, updateDto: UpdateExpenseDto): Promise<{
        vendor: {
            id: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            address: string | null;
            contactName: string | null;
            phone: string | null;
        } | null;
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        title: string;
        categoryId: string;
        amount: number;
        expenseDate: Date;
        billUrl: string | null;
        referenceNumber: string | null;
        vendorId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        title: string;
        categoryId: string;
        amount: number;
        expenseDate: Date;
        billUrl: string | null;
        referenceNumber: string | null;
        vendorId: string | null;
    }>;
}
