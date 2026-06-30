import { PageDto } from "../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { CourseQueryOptionsDto, CreateCourseDto, UpdateCourseDto } from '../../dto/course.dto';
export declare class CoursesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateCourseDto): Promise<any>;
    findAll(queryOptions: CourseQueryOptionsDto): Promise<PageDto<{
        subjects: ({
            subject: {
                id: string;
                name: string;
                code: string | null;
                credits: number | null;
            };
        } & {
            courseId: string;
            subjectId: string;
            isOptional: boolean;
        })[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        description: string | null;
        code: string | null;
    }>>;
    findOne(id: string, tx?: any): Promise<any>;
    update(id: string, updateDto: UpdateCourseDto): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        description: string | null;
        code: string | null;
    }>;
}
