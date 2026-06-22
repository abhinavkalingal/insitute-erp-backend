import { PageOptionsDto } from "../../../core/utils/pagination/page-options.dto";
export declare class CreateAcademicYearDto {
    name: string;
    startDate: string;
    endDate: string;
    isActive?: boolean;
}
declare const UpdateAcademicYearDto_base: import("@nestjs/common").Type<Partial<CreateAcademicYearDto>>;
export declare class UpdateAcademicYearDto extends UpdateAcademicYearDto_base {
}
export declare class AcademicYearQueryOptionsDto extends PageOptionsDto {
    readonly isActive?: string;
}
export {};
