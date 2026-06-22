import { PageOptionsDto } from "../../../core/utils/pagination/page-options.dto";
export declare class TimetablePeriodDto {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    subjectId: string;
    teacherId?: string;
    roomId?: string;
}
export declare class CreateTimetableDto {
    batchId: string;
    name: string;
    isActive?: boolean;
    periods: TimetablePeriodDto[];
}
declare const UpdateTimetableDto_base: import("@nestjs/common").Type<Partial<CreateTimetableDto>>;
export declare class UpdateTimetableDto extends UpdateTimetableDto_base {
}
export declare class TimetableQueryOptionsDto extends PageOptionsDto {
    readonly batchId?: string;
    readonly isActive?: string;
}
export {};
