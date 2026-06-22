import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class CreateFeeCategoryDto {
    name: string;
    description?: string;
}
declare const UpdateFeeCategoryDto_base: import("@nestjs/common").Type<Partial<CreateFeeCategoryDto>>;
export declare class UpdateFeeCategoryDto extends UpdateFeeCategoryDto_base {
}
export declare class FeeCategoryQueryOptionsDto extends PageOptionsDto {
}
export {};
