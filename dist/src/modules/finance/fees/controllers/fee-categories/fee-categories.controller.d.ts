import { CreateFeeCategoryDto, FeeCategoryQueryOptionsDto, UpdateFeeCategoryDto } from '../../dto/fee-category.dto';
import { FeeCategoriesService } from '../../services/fee-categories/fee-categories.service';
export declare class FeeCategoriesController {
    private readonly feeCategoriesService;
    constructor(feeCategoriesService: FeeCategoriesService);
    create(createDto: CreateFeeCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    findAll(queryOptions: FeeCategoryQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
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
