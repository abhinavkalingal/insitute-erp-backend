import { PageDto } from "../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { CreateEventCategoryDto, EventCategoryQueryOptionsDto, UpdateEventCategoryDto } from '../../dto/category.dto';
export declare class EventCategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateEventCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(queryOptions: EventCategoryQueryOptionsDto): Promise<PageDto<{
        _count: {
            events: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateDto: UpdateEventCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
