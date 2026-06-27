import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { ResultQueryOptionsDto } from '../../dto/result-query-options.dto';
export declare class ResultsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generateResultsForTerm(examTermId: string): Promise<{
        message: string;
        totalProcessed: number;
    }>;
    getRankings(examTermId: string, queryOptions: ResultQueryOptionsDto): Promise<PageDto<{
        student: {
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            profile: Prisma.JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            documents: Prisma.JsonValue | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
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
                profile: Prisma.JsonValue | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                userId: string;
                status: string;
                courseId: string | null;
                batchId: string | null;
                branchId: string | null;
                documents: Prisma.JsonValue | null;
                enrollmentNo: string | null;
                admissionDate: Date | null;
            };
            term: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
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
