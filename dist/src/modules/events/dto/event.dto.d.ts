import { PageOptionsDto } from "../../../core/utils/pagination/page-options.dto";
export declare enum EventStatus {
    UPCOMING = "UPCOMING",
    ONGOING = "ONGOING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare class CreateEventDto {
    categoryId: string;
    title: string;
    description?: string;
    location?: string;
    startDate: string;
    endDate: string;
    isRegistrationRequired?: boolean;
    maxParticipants?: number;
}
declare const UpdateEventDto_base: import("@nestjs/common").Type<Partial<CreateEventDto>>;
export declare class UpdateEventDto extends UpdateEventDto_base {
    status?: string;
}
export declare class EventQueryOptionsDto extends PageOptionsDto {
    readonly categoryId?: string;
    readonly status?: string;
}
export {};
