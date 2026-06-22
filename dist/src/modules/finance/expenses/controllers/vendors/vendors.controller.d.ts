import { CreateVendorDto, UpdateVendorDto, VendorQueryOptionsDto } from '../../dto/vendor.dto';
import { VendorsService } from '../../services/vendors/vendors.service';
export declare class VendorsController {
    private readonly vendorsService;
    constructor(vendorsService: VendorsService);
    create(createDto: CreateVendorDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string | null;
        address: string | null;
        contactName: string | null;
        phone: string | null;
    }>;
    findAll(queryOptions: VendorQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string | null;
        address: string | null;
        contactName: string | null;
        phone: string | null;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string | null;
        address: string | null;
        contactName: string | null;
        phone: string | null;
    }>;
    update(id: string, updateDto: UpdateVendorDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string | null;
        address: string | null;
        contactName: string | null;
        phone: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string | null;
        address: string | null;
        contactName: string | null;
        phone: string | null;
    }>;
}
