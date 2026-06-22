import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class CreateAssignmentDto {
    title: string;
    description?: string;
    dueDate: string;
    staffId: string;
    subjectId: string;
    courseId?: string;
    batchId?: string;
    maxMarks?: number;
}
declare const UpdateAssignmentDto_base: import("@nestjs/common").Type<Partial<CreateAssignmentDto>>;
export declare class UpdateAssignmentDto extends UpdateAssignmentDto_base {
}
export declare class AssignmentQueryOptionsDto extends PageOptionsDto {
    readonly subjectId?: string;
    readonly courseId?: string;
    readonly batchId?: string;
    readonly staffId?: string;
}
export {};
