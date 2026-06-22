import { PageOptionsDto } from "../../../core/utils/pagination/page-options.dto";
export declare class CreateFeeCategoryDto {
    name: string;
    description?: string;
}
declare const UpdateFeeCategoryDto_base: import("@nestjs/common").Type<Partial<CreateFeeCategoryDto>>;
export declare class UpdateFeeCategoryDto extends UpdateFeeCategoryDto_base {
}
export declare class FeeCategoryQueryOptionsDto extends PageOptionsDto {
}
export declare class CreateFeeStructureDto {
    categoryId: string;
    name: string;
    amount: number;
    courseId?: string;
    batchId?: string;
}
declare const UpdateFeeStructureDto_base: import("@nestjs/common").Type<Partial<CreateFeeStructureDto>>;
export declare class UpdateFeeStructureDto extends UpdateFeeStructureDto_base {
}
export declare class FeeStructureQueryOptionsDto extends PageOptionsDto {
    readonly categoryId?: string;
    readonly courseId?: string;
    readonly batchId?: string;
}
export {};
