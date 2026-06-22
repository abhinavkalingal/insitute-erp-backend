import { PageDto } from "../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { ParticipantQueryOptionsDto, RegisterParticipantDto } from '../../dto/register-participant.dto';
export declare class EventParticipantsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findAll(queryOptions: ParticipantQueryOptionsDto): Promise<PageDto<{
        staff: ({
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            profile: Prisma.JsonValue | null;
            status: string;
            branchId: string | null;
            documents: Prisma.JsonValue | null;
            employeeId: string | null;
            department: string | null;
            designation: string | null;
            joiningDate: Date | null;
        }) | null;
        student: ({
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            profile: Prisma.JsonValue | null;
            status: string;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
            documents: Prisma.JsonValue | null;
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
