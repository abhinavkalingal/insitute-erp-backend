import { PageOptionsDto } from "../../../core/utils/pagination/page-options.dto";
export declare class CreateSubjectDto {
    name: string;
    code?: string;
    credits?: number;
    isActive?: boolean;
}
declare const UpdateSubjectDto_base: import("@nestjs/common").Type<Partial<CreateSubjectDto>>;
export declare class UpdateSubjectDto extends UpdateSubjectDto_base {
}
export declare class SubjectQueryOptionsDto extends PageOptionsDto {
    readonly isActive?: string;
}
export {};
