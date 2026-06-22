import { CreateTimetableDto, TimetableQueryOptionsDto, UpdateTimetableDto } from '../../dto/timetable.dto';
import { TimetablesService } from '../../services/timetables/timetables.service';
export declare class TimetablesController {
    private readonly timetablesService;
    constructor(timetablesService: TimetablesService);
    create(createDto: CreateTimetableDto): Promise<any>;
    findAll(queryOptions: TimetableQueryOptionsDto): Promise<import("../../../../core/utils/pagination/page.dto").PageDto<{
        _count: {
            periods: number;
        };
        batch: {
            name: string;
            course: {
                name: string;
            };
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        batchId: string;
    }>>;
    findTeacherSchedule(staffId: string): Promise<({
        subject: {
            name: string;
            code: string | null;
        };
        room: {
            name: string;
        } | null;
        timetable: {
            name: string;
            batch: {
                name: string;
                course: {
                    name: string;
                };
            };
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        subjectId: string;
        startTime: string;
        endTime: string;
        dayOfWeek: number;
        teacherId: string | null;
        roomId: string | null;
        timetableId: string;
    })[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateDto: UpdateTimetableDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
