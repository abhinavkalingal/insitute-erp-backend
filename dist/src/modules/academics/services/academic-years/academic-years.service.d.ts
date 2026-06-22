import { PageDto } from "../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { AcademicYearQueryOptionsDto, CreateAcademicYearDto, UpdateAcademicYearDto } from '../../dto/academic-year.dto';
export declare class AcademicYearsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateAcademicYearDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        startDate: Date;
        endDate: Date;
    }>;
    findAll(queryOptions: AcademicYearQueryOptionsDto): Promise<PageDto<{
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
