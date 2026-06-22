import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class CreateSubmissionDto {
    assignmentId: string;
    studentId: string;
    content?: string;
    fileUrl?: string;
}
export declare class GradeSubmissionDto {
    staffId: string;
    marksObtained: number;
    feedback?: string;
}
export declare class SubmissionQueryOptionsDto extends PageOptionsDto {
    readonly assignmentId?: string;
    readonly studentId?: string;
    readonly status?: string;
}
