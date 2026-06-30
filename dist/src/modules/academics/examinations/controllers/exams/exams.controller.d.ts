import { CreateExamDto, CreateExamTermDto, ExamQueryOptionsDto, ExamTermQueryOptionsDto, UpdateExamDto, UpdateExamTermDto } from '../../dto/exam.dto';
import { ExamsService } from '../../services/exams/exams.service';
export declare class ExamsController {
    private readonly examsService;
    constructor(examsService: ExamsService);
    createTerm(createDto: CreateExamTermDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        startDate: Date;
        endDate: Date;
        isPublished: boolean;
    }>;
    findAllTerms(queryOptions: ExamTermQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
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
            maxMarks: number;
            courseId: string | null;
            batchId: string | null;
            subjectId: string;
            startTime: string;
            endTime: string;
            passingMarks: number;
            examTermId: string;
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
        maxMarks: number;
        courseId: string | null;
        batchId: string | null;
        subjectId: string;
        startTime: string;
        endTime: string;
        passingMarks: number;
        examTermId: string;
    }>;
    findAllExams(queryOptions: ExamQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
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
        maxMarks: number;
        courseId: string | null;
        batchId: string | null;
        subjectId: string;
        startTime: string;
        endTime: string;
        passingMarks: number;
        examTermId: string;
    }>>;
    findOneExam(id: string): Promise<{
        subject: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            code: string | null;
            credits: number | null;
        };
        course: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            description: string | null;
            code: string | null;
        } | null;
        batch: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
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
        maxMarks: number;
        courseId: string | null;
        batchId: string | null;
        subjectId: string;
        startTime: string;
        endTime: string;
        passingMarks: number;
        examTermId: string;
    }>;
    updateExam(id: string, updateDto: UpdateExamDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        maxMarks: number;
        courseId: string | null;
        batchId: string | null;
        subjectId: string;
        startTime: string;
        endTime: string;
        passingMarks: number;
        examTermId: string;
    }>;
    removeExam(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        maxMarks: number;
        courseId: string | null;
        batchId: string | null;
        subjectId: string;
        startTime: string;
        endTime: string;
        passingMarks: number;
        examTermId: string;
    }>;
}
