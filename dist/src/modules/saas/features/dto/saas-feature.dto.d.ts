import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare enum SaasFeatureType {
    BOOLEAN = "BOOLEAN",
    LIMIT = "LIMIT"
}
export declare class CreateSaasFeatureDto {
    key: string;
    name: string;
    description?: string;
    type: string;
}
declare const UpdateSaasFeatureDto_base: import("@nestjs/common").Type<Partial<CreateSaasFeatureDto>>;
export declare class UpdateSaasFeatureDto extends UpdateSaasFeatureDto_base {
}
export declare class SaasFeatureQueryOptionsDto extends PageOptionsDto {
    readonly type?: string;
}
export {};
