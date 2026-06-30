import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { CreateExpenseCategoryDto, ExpenseCategoryQueryOptionsDto, UpdateExpenseCategoryDto } from '../../dto/expense-category.dto';
export declare class ExpenseCategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateExpenseCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    findAll(queryOptions: ExpenseCategoryQueryOptionsDto): Promise<PageDto<{
        _count: {
            expenses: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    update(id: string, updateDto: UpdateExpenseCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
}
