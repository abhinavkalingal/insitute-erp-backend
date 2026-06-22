import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { CreateExpenseCategoryDto, ExpenseCategoryQueryOptionsDto, UpdateExpenseCategoryDto } from '../../dto/expense-category.dto';
export declare class ExpenseCategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateExpenseCategoryDto): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    findAll(queryOptions: ExpenseCategoryQueryOptionsDto): Promise<PageDto<{
        _count: {
            expenses: number;
        };
    } & {
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    update(id: string, updateDto: UpdateExpenseCategoryDto): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
}
