import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { CreateFeeCategoryDto, FeeCategoryQueryOptionsDto, UpdateFeeCategoryDto } from '../../dto/fee-category.dto';
export declare class FeeCategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateFeeCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    findAll(queryOptions: FeeCategoryQueryOptionsDto): Promise<PageDto<{
        _count: {
            structures: number;
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
    update(id: string, updateDto: UpdateFeeCategoryDto): Promise<{
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
