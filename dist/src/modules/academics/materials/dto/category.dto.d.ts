import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class CreateMaterialCategoryDto {
    name: string;
    description?: string;
}
declare const UpdateMaterialCategoryDto_base: import("@nestjs/common").Type<Partial<CreateMaterialCategoryDto>>;
export declare class UpdateMaterialCategoryDto extends UpdateMaterialCategoryDto_base {
}
export declare class MaterialCategoryQueryOptionsDto extends PageOptionsDto {
}
export {};
