import { CreateMaterialCategoryDto, MaterialCategoryQueryOptionsDto, UpdateMaterialCategoryDto } from '../../dto/category.dto';
import { CategoriesService } from '../../services/categories/categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createDto: CreateMaterialCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    findAll(queryOptions: MaterialCategoryQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
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
    update(id: string, updateDto: UpdateMaterialCategoryDto): Promise<{
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
