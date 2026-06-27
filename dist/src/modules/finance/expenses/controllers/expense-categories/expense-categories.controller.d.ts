import { CreateExpenseCategoryDto, ExpenseCategoryQueryOptionsDto, UpdateExpenseCategoryDto } from '../../dto/expense-category.dto';
import { ExpenseCategoriesService } from '../../services/expense-categories/expense-categories.service';
export declare class ExpenseCategoriesController {
    private readonly expenseCategoriesService;
    constructor(expenseCategoriesService: ExpenseCategoriesService);
    create(createDto: CreateExpenseCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    findAll(queryOptions: ExpenseCategoryQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        _count: {
            expenses: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    update(id: string, updateDto: UpdateExpenseCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
}
