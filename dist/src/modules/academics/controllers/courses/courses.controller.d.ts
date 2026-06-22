import { CourseQueryOptionsDto, CreateCourseDto, UpdateCourseDto } from '../../dto/course.dto';
import { CoursesService } from '../../services/courses/courses.service';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createDto: CreateCourseDto): Promise<any>;
    findAll(queryOptions: CourseQueryOptionsDto): Promise<import("../../../../core/utils/pagination/page.dto").PageDto<{
        subjects: ({
            subject: {
                id: string;
                name: string;
                code: string | null;
                credits: number | null;
            };
        } & {
            subjectId: string;
            courseId: string;
            isOptional: boolean;
        })[];
    } & {
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        deletedAt: Date | null;
        code: string | null;
    }>>;
    findOne(id: string): Promise<any>;
    update(id: string, updateDto: UpdateCourseDto): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        deletedAt: Date | null;
        code: string | null;
    }>;
}
