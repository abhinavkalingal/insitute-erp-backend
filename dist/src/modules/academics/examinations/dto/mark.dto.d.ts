import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class StudentMarkDto {
    studentId: string;
    marksObtained?: number;
    remarks?: string;
    isAbsent?: boolean;
}
export declare class BulkUpsertMarksDto {
    examId: string;
    marks: StudentMarkDto[];
}
export declare class MarkQueryOptionsDto extends PageOptionsDto {
    readonly examId?: string;
    readonly studentId?: string;
}
