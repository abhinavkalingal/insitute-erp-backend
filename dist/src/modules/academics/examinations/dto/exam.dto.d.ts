import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class CreateExamTermDto {
    name: string;
    startDate: string;
    endDate: string;
    isPublished?: boolean;
}
declare const UpdateExamTermDto_base: import("@nestjs/common").Type<Partial<CreateExamTermDto>>;
export declare class UpdateExamTermDto extends UpdateExamTermDto_base {
}
export declare class ExamTermQueryOptionsDto extends PageOptionsDto {
}
export declare class CreateExamDto {
    examTermId: string;
    subjectId: string;
    courseId?: string;
    batchId?: string;
    date: string;
    startTime: string;
    endTime: string;
    maxMarks: number;
    passingMarks: number;
}
declare const UpdateExamDto_base: import("@nestjs/common").Type<Partial<CreateExamDto>>;
export declare class UpdateExamDto extends UpdateExamDto_base {
}
export declare class ExamQueryOptionsDto extends PageOptionsDto {
    readonly examTermId?: string;
    readonly subjectId?: string;
    readonly courseId?: string;
    readonly batchId?: string;
}
export {};
