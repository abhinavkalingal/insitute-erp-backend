import { PageDto } from "../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { CreateEventDto, EventQueryOptionsDto, UpdateEventDto } from '../../dto/event.dto';
export declare class EventsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findAll(queryOptions: EventQueryOptionsDto): Promise<PageDto<{
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
