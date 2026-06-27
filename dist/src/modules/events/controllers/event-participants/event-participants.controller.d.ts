import { ParticipantQueryOptionsDto, RegisterParticipantDto } from '../../dto/register-participant.dto';
import { EventParticipantsService } from '../../services/event-participants/event-participants.service';
export declare class EventParticipantsController {
    private readonly eventParticipantsService;
    constructor(eventParticipantsService: EventParticipantsService);
    register(registerDto: RegisterParticipantDto): Promise<{
        id: string;
        status: string;
        staffId: string | null;
        studentId: string | null;
        eventId: string;
        guestName: string | null;
        guestEmail: string | null;
        registrationDate: Date;
    }>;
    findAll(queryOptions: ParticipantQueryOptionsDto): Promise<import("../../../../core/utils/pagination/page.dto").PageDto<{
        staff: ({
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            branchId: string | null;
            employeeId: string | null;
            department: string | null;
            designation: string | null;
            joiningDate: Date | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
        }) | null;
        student: ({
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
        }) | null;
        event: {
            title: string;
        };
    } & {
        id: string;
        status: string;
        staffId: string | null;
        studentId: string | null;
        eventId: string;
        guestName: string | null;
        guestEmail: string | null;
        registrationDate: Date;
    }>>;
    cancelRegistration(id: string): Promise<{
        id: string;
        status: string;
        staffId: string | null;
        studentId: string | null;
        eventId: string;
        guestName: string | null;
        guestEmail: string | null;
        registrationDate: Date;
    }>;
}
