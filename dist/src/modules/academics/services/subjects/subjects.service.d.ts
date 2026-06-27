import { PageDto } from "../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { CreateSubjectDto, SubjectQueryOptionsDto, UpdateSubjectDto } from '../../dto/subject.dto';
export declare class SubjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateSubjectDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        code: string | null;
        credits: number | null;
    }>;
    findAll(queryOptions: SubjectQueryOptionsDto): Promise<PageDto<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        code: string | null;
        credits: number | null;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        code: string | null;
        credits: number | null;
    }>;
    update(id: string, updateDto: UpdateSubjectDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        code: string | null;
        credits: number | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        code: string | null;
        credits: number | null;
    }>;
}
