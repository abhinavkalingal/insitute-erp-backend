import { PageDto } from "../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { CreateRoomDto, RoomQueryOptionsDto, UpdateRoomDto } from '../../dto/room.dto';
export declare class RoomsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateRoomDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        deletedAt: Date | null;
        branchId: string | null;
        capacity: number | null;
    }>;
    findAll(queryOptions: RoomQueryOptionsDto): Promise<PageDto<{
        branch: {
            name: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        deletedAt: Date | null;
        branchId: string | null;
        capacity: number | null;
    }>>;
    findOne(id: string): Promise<{
        branch: {
            name: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        deletedAt: Date | null;
        branchId: string | null;
        capacity: number | null;
    }>;
    update(id: string, updateDto: UpdateRoomDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        deletedAt: Date | null;
        branchId: string | null;
        capacity: number | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        deletedAt: Date | null;
        branchId: string | null;
        capacity: number | null;
    }>;
}
