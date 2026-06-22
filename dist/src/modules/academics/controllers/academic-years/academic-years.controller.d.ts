import { AcademicYearQueryOptionsDto, CreateAcademicYearDto, UpdateAcademicYearDto } from '../../dto/academic-year.dto';
import { AcademicYearsService } from '../../services/academic-years/academic-years.service';
export declare class AcademicYearsController {
    private readonly academicYearsService;
    constructor(academicYearsService: AcademicYearsService);
    create(createDto: CreateAcademicYearDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        startDate: Date;
        endDate: Date;
    }>;
    findAll(queryOptions: AcademicYearQueryOptionsDto): Promise<import("../../../../core/utils/pagination/page.dto").PageDto<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        startDate: Date;
        endDate: Date;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        startDate: Date;
        endDate: Date;
    }>;
    update(id: string, updateDto: UpdateAcademicYearDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        startDate: Date;
        endDate: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
