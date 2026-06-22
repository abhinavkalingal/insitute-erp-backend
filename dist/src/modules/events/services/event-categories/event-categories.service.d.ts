import { PageDto } from "../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { CreateEventCategoryDto, EventCategoryQueryOptionsDto, UpdateEventCategoryDto } from '../../dto/category.dto';
export declare class EventCategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateEventCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    findAll(queryOptions: EventCategoryQueryOptionsDto): Promise<PageDto<{
        _count: {
            events: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    update(id: string, updateDto: UpdateEventCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
}
