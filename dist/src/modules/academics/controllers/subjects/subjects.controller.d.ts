import { CreateSubjectDto, SubjectQueryOptionsDto, UpdateSubjectDto } from '../../dto/subject.dto';
import { SubjectsService } from '../../services/subjects/subjects.service';
export declare class SubjectsController {
    private readonly subjectsService;
    constructor(subjectsService: SubjectsService);
    create(createDto: CreateSubjectDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        deletedAt: Date | null;
        code: string | null;
        credits: number | null;
    }>;
    findAll(queryOptions: SubjectQueryOptionsDto): Promise<import("../../../../core/utils/pagination/page.dto").PageDto<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        deletedAt: Date | null;
        code: string | null;
        credits: number | null;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        deletedAt: Date | null;
        code: string | null;
        credits: number | null;
    }>;
    update(id: string, updateDto: UpdateSubjectDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        deletedAt: Date | null;
        code: string | null;
        credits: number | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        deletedAt: Date | null;
        code: string | null;
        credits: number | null;
    }>;
}
