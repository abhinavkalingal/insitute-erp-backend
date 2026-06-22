import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class CreateVendorDto {
    name: string;
    contactName?: string;
    email?: string;
    phone?: string;
    address?: string;
}
declare const UpdateVendorDto_base: import("@nestjs/common").Type<Partial<CreateVendorDto>>;
export declare class UpdateVendorDto extends UpdateVendorDto_base {
}
export declare class VendorQueryOptionsDto extends PageOptionsDto {
}
export {};
