import { PageDto } from "../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { CreateTimetableDto, TimetableQueryOptionsDto, UpdateTimetableDto } from '../../dto/timetable.dto';
export declare class TimetablesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateTimetableDto): Promise<any>;
    findAll(queryOptions: TimetableQueryOptionsDto): Promise<PageDto<{
        batch: {
            course: {
                name: string;
            };
            name: string;
        };
        _count: {
            periods: number;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        batchId: string;
    }>>;
    findOne(id: string, tx?: any): Promise<any>;
    update(id: string, updateDto: UpdateTimetableDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findTeacherSchedule(staffId: string): Promise<({
        subject: {
            name: string;
            code: string | null;
        };
        room: {
            name: string;
        } | null;
        timetable: {
            batch: {
                course: {
                    name: string;
                };
                name: string;
            };
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        subjectId: string;
        startTime: string;
        endTime: string;
        dayOfWeek: number;
        timetableId: string;
        teacherId: string | null;
        roomId: string | null;
    })[]>;
}
