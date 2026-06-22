import { PageOptionsDto } from "../../../core/utils/pagination/page-options.dto";
export declare class CreateRoomDto {
    name: string;
    branchId?: string;
    capacity?: number;
}
declare const UpdateRoomDto_base: import("@nestjs/common").Type<Partial<CreateRoomDto>>;
export declare class UpdateRoomDto extends UpdateRoomDto_base {
}
export declare class RoomQueryOptionsDto extends PageOptionsDto {
    readonly branchId?: string;
}
export {};
