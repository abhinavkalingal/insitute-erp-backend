import { PageOptionsDto } from "../../../core/utils/pagination/page-options.dto";
export declare class CourseSubjectDto {
    subjectId: string;
    isOptional?: boolean;
}
export declare class CreateCourseDto {
    name: string;
    code?: string;
    description?: string;
    isActive?: boolean;
    subjects?: CourseSubjectDto[];
}
declare const UpdateCourseDto_base: import("@nestjs/common").Type<Partial<CreateCourseDto>>;
export declare class UpdateCourseDto extends UpdateCourseDto_base {
}
export declare class CourseQueryOptionsDto extends PageOptionsDto {
    readonly isActive?: string;
}
export {};
