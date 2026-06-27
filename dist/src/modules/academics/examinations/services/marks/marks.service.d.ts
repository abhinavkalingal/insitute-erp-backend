import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { BulkUpsertMarksDto, MarkQueryOptionsDto } from '../../dto/mark.dto';
export declare class MarksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    bulkUpsertMarks(bulkDto: BulkUpsertMarksDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        studentId: string;
        marksObtained: number | null;
        remarks: string | null;
        isAbsent: boolean;
        examId: string;
    }[]>;
    findAll(queryOptions: MarkQueryOptionsDto): Promise<PageDto<{
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
