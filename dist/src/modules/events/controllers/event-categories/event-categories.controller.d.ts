import { CreateEventCategoryDto, EventCategoryQueryOptionsDto, UpdateEventCategoryDto } from '../../dto/category.dto';
import { EventCategoriesService } from '../../services/event-categories/event-categories.service';
export declare class EventCategoriesController {
    private readonly eventCategoriesService;
    constructor(eventCategoriesService: EventCategoriesService);
    create(createDto: CreateEventCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    findAll(queryOptions: EventCategoryQueryOptionsDto): Promise<import("../../../../core/utils/pagination/page.dto").PageDto<{
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
