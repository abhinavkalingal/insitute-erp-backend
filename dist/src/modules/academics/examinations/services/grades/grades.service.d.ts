import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { CreateGradeRuleDto, GradeRuleQueryOptionsDto, UpdateGradeRuleDto } from '../../dto/grade.dto';
export declare class GradesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateGradeRuleDto): Promise<{
        id: string;
        gradeName: string;
        minPercent: number;
        maxPercent: number;
        gradePoint: number;
    }>;
    findAll(queryOptions: GradeRuleQueryOptionsDto): Promise<PageDto<{
        id: string;
        gradeName: string;
        minPercent: number;
        maxPercent: number;
        gradePoint: number;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        gradeName: string;
        minPercent: number;
        maxPercent: number;
        gradePoint: number;
    }>;
    update(id: string, updateDto: UpdateGradeRuleDto): Promise<{
        id: string;
        gradeName: string;
        minPercent: number;
        maxPercent: number;
        gradePoint: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        gradeName: string;
        minPercent: number;
        maxPercent: number;
        gradePoint: number;
    }>;
}
