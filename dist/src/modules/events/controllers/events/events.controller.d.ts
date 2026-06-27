import { CreateEventDto, EventQueryOptionsDto, UpdateEventDto } from '../../dto/event.dto';
import { EventsService } from '../../services/events/events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createDto: CreateEventDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        startDate: Date;
        endDate: Date;
        status: string;
        categoryId: string;
        location: string | null;
        isRegistrationRequired: boolean;
        maxParticipants: number | null;
    }>;
    findAll(queryOptions: EventQueryOptionsDto): Promise<import("../../../../core/utils/pagination/page.dto").PageDto<{
        _count: {
            participants: number;
        };
        category: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        startDate: Date;
        endDate: Date;
        status: string;
        categoryId: string;
        location: string | null;
        isRegistrationRequired: boolean;
        maxParticipants: number | null;
    }>>;
    findOne(id: string): Promise<{
        _count: {
            participants: number;
        };
        category: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        startDate: Date;
        endDate: Date;
        status: string;
        categoryId: string;
        location: string | null;
        isRegistrationRequired: boolean;
        maxParticipants: number | null;
    }>;
    update(id: string, updateDto: UpdateEventDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        startDate: Date;
        endDate: Date;
        status: string;
        categoryId: string;
        location: string | null;
        isRegistrationRequired: boolean;
        maxParticipants: number | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        startDate: Date;
        endDate: Date;
        status: string;
        categoryId: string;
        location: string | null;
        isRegistrationRequired: boolean;
        maxParticipants: number | null;
    }>;
}
