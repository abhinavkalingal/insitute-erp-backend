import { PageOptionsDto } from "../../../core/utils/pagination/page-options.dto";
export declare class CreateEventCategoryDto {
    name: string;
}
declare const UpdateEventCategoryDto_base: import("@nestjs/common").Type<Partial<CreateEventCategoryDto>>;
export declare class UpdateEventCategoryDto extends UpdateEventCategoryDto_base {
}
export declare class EventCategoryQueryOptionsDto extends PageOptionsDto {
}
export {};
