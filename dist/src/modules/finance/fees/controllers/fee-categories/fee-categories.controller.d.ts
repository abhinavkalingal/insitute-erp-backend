import { CreateFeeCategoryDto, FeeCategoryQueryOptionsDto, UpdateFeeCategoryDto } from '../../dto/fee-category.dto';
import { FeeCategoriesService } from '../../services/fee-categories/fee-categories.service';
export declare class FeeCategoriesController {
    private readonly feeCategoriesService;
    constructor(feeCategoriesService: FeeCategoriesService);
    create(createDto: CreateFeeCategoryDto): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    findAll(queryOptions: FeeCategoryQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        _count: {
            structures: number;
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
    update(id: string, updateDto: UpdateFeeCategoryDto): Promise<{
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
