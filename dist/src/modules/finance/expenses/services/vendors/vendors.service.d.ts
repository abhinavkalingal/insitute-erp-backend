import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { CreateVendorDto, UpdateVendorDto, VendorQueryOptionsDto } from '../../dto/vendor.dto';
export declare class VendorsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateVendorDto): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string | null;
        contactName: string | null;
        phone: string | null;
    }>;
    findAll(queryOptions: VendorQueryOptionsDto): Promise<PageDto<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string | null;
        contactName: string | null;
        phone: string | null;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string | null;
        contactName: string | null;
        phone: string | null;
    }>;
    update(id: string, updateDto: UpdateVendorDto): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string | null;
        contactName: string | null;
        phone: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string | null;
        contactName: string | null;
        phone: string | null;
    }>;
}
