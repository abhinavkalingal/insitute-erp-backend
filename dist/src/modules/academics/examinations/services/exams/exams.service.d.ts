import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { CreateExamDto, CreateExamTermDto, ExamQueryOptionsDto, ExamTermQueryOptionsDto, UpdateExamDto, UpdateExamTermDto } from '../../dto/exam.dto';
export declare class ExamsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createTerm(createDto: CreateExamTermDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        startDate: Date;
        endDate: Date;
        isPublished: boolean;
    }>;
    findAllTerms(queryOptions: ExamTermQueryOptionsDto): Promise<PageDto<{
        _count: {
            exams: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        startDate: Date;
        endDate: Date;
        isPublished: boolean;
    }>>;
    findOneTerm(id: string): Promise<{
        exams: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            date: Date;
            subjectId: string;
            courseId: string | null;
            batchId: string | null;
            maxMarks: number;
            examTermId: string;
            startTime: string;
            endTime: string;
            passingMarks: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        startDate: Date;
        endDate: Date;
        isPublished: boolean;
    }>;
    updateTerm(id: string, updateDto: UpdateExamTermDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        startDate: Date;
        endDate: Date;
        isPublished: boolean;
    }>;
    removeTerm(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        startDate: Date;
        endDate: Date;
        isPublished: boolean;
    }>;
    createExam(createDto: CreateExamDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        subjectId: string;
        courseId: string | null;
        batchId: string | null;
        maxMarks: number;
        examTermId: string;
        startTime: string;
        endTime: string;
        passingMarks: number;
    }>;
    findAllExams(queryOptions: ExamQueryOptionsDto): Promise<PageDto<{
        subject: {
            name: string;
            code: string | null;
        };
        course: {
            name: string;
        } | null;
        batch: {
            name: string;
        } | null;
        term: {
            name: string;
            isPublished: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        subjectId: string;
        courseId: string | null;
        batchId: string | null;
        maxMarks: number;
        examTermId: string;
        startTime: string;
        endTime: string;
        passingMarks: number;
    }>>;
    findOneExam(id: string): Promise<{
        subject: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            isActive: boolean;
            deletedAt: Date | null;
            code: string | null;
            credits: number | null;
        };
        course: {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            isActive: boolean;
            deletedAt: Date | null;
            code: string | null;
        } | null;
        batch: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            isActive: boolean;
            deletedAt: Date | null;
            courseId: string;
            branchId: string | null;
            academicYearId: string;
            capacity: number | null;
        } | null;
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
        date: Date;
        subjectId: string;
        courseId: string | null;
        batchId: string | null;
        maxMarks: number;
        examTermId: string;
        startTime: string;
        endTime: string;
        passingMarks: number;
    }>;
    updateExam(id: string, updateDto: UpdateExamDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        subjectId: string;
        courseId: string | null;
        batchId: string | null;
        maxMarks: number;
        examTermId: string;
        startTime: string;
        endTime: string;
        passingMarks: number;
    }>;
    removeExam(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        subjectId: string;
        courseId: string | null;
        batchId: string | null;
        maxMarks: number;
        examTermId: string;
        startTime: string;
        endTime: string;
        passingMarks: number;
    }>;
}
