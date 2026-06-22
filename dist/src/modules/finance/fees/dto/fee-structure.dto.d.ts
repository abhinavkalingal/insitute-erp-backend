import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class CreateInstallmentPlanDto {
    name: string;
    percentage?: number;
    amount?: number;
    dueDate: string;
}
export declare class CreateFeeStructureDto {
    categoryId: string;
    name: string;
    amount: number;
    courseId?: string;
    batchId?: string;
    installments?: CreateInstallmentPlanDto[];
}
declare const UpdateFeeStructureDto_base: import("@nestjs/common").Type<Partial<CreateFeeStructureDto>>;
export declare class UpdateFeeStructureDto extends UpdateFeeStructureDto_base {
}
export declare class FeeStructureQueryOptionsDto extends PageOptionsDto {
    readonly categoryId?: string;
}
export {};
