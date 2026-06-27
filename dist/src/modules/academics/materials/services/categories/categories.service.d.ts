import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { CreateMaterialCategoryDto, MaterialCategoryQueryOptionsDto, UpdateMaterialCategoryDto } from '../../dto/category.dto';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateMaterialCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    findAll(queryOptions: MaterialCategoryQueryOptionsDto): Promise<PageDto<{
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
