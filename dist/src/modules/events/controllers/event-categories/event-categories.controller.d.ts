import { CreateEventCategoryDto, EventCategoryQueryOptionsDto, UpdateEventCategoryDto } from '../../dto/category.dto';
import { EventCategoriesService } from '../../services/event-categories/event-categories.service';
export declare class EventCategoriesController {
    private readonly eventCategoriesService;
    constructor(eventCategoriesService: EventCategoriesService);
    create(createDto: CreateEventCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(queryOptions: EventCategoryQueryOptionsDto): Promise<import("../../../../core/utils/pagination/page.dto").PageDto<{
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
