import { PageOptionsDto } from "../../../core/utils/pagination/page-options.dto";
export declare class RegisterParticipantDto {
    eventId: string;
    studentId?: string;
    staffId?: string;
    guestName?: string;
    guestEmail?: string;
}
export declare class ParticipantQueryOptionsDto extends PageOptionsDto {
    readonly eventId?: string;
}
