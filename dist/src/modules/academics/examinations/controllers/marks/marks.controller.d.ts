import { BulkUpsertMarksDto, MarkQueryOptionsDto } from '../../dto/mark.dto';
import { MarksService } from '../../services/marks/marks.service';
export declare class MarksController {
    private readonly marksService;
    constructor(marksService: MarksService);
    bulkUpsert(bulkDto: BulkUpsertMarksDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        studentId: string;
        marksObtained: number | null;
        remarks: string | null;
        isAbsent: boolean;
        examId: string;
    }[]>;
    findAll(queryOptions: MarkQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        student: {
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
        };
        exam: {
            subject: {
                name: string;
            };
            maxMarks: number;
            passingMarks: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        studentId: string;
        marksObtained: number | null;
        remarks: string | null;
        isAbsent: boolean;
        examId: string;
    }>>;
}
