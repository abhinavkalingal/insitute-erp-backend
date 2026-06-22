import { CreateGradeRuleDto, GradeRuleQueryOptionsDto, UpdateGradeRuleDto } from '../../dto/grade.dto';
import { GradesService } from '../../services/grades/grades.service';
export declare class GradesController {
    private readonly gradesService;
    constructor(gradesService: GradesService);
    create(createDto: CreateGradeRuleDto): Promise<{
        id: string;
        gradeName: string;
        minPercent: number;
        maxPercent: number;
        gradePoint: number;
    }>;
    findAll(queryOptions: GradeRuleQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
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
