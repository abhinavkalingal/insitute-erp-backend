import { ResultQueryOptionsDto } from '../../dto/result-query-options.dto';
import { ResultsService } from '../../services/results/results.service';
export declare class ResultsController {
    private readonly resultsService;
    constructor(resultsService: ResultsService);
    generateResults(examTermId: string): Promise<{
        message: string;
        totalProcessed: number;
    }>;
    getRankings(examTermId: string, queryOptions: ResultQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        student: {
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            status: string;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        studentId: string;
        examTermId: string;
        totalMarksObtained: number;
        totalMaxMarks: number;
        percentage: number;
        gradePointAverage: number | null;
        rank: number | null;
        remarks: string | null;
    }>>;
    getMarkSheet(examTermId: string, studentId: string): Promise<{
        summary: {
            student: {
                user: {
                    email: string;
                    firstName: string;
                    lastName: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                userId: string;
                profile: import("@prisma/client/runtime/client").JsonValue | null;
                status: string;
                courseId: string | null;
                batchId: string | null;
                branchId: string | null;
                enrollmentNo: string | null;
                admissionDate: Date | null;
                documents: import("@prisma/client/runtime/client").JsonValue | null;
            };
            term: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                startDate: Date;
                endDate: Date;
                isPublished: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            studentId: string;
            examTermId: string;
            totalMarksObtained: number;
            totalMaxMarks: number;
            percentage: number;
            gradePointAverage: number | null;
            rank: number | null;
            remarks: string | null;
        };
        details: ({
            exam: {
                date: Date;
                subject: {
                    name: string;
                    code: string | null;
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
        })[];
    }>;
}
