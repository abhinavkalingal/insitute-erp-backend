import { PageOptionsDto } from "../../../core/utils/pagination/page-options.dto";
export declare class CreateBatchDto {
    courseId: string;
    academicYearId: string;
    branchId?: string;
    name: string;
    capacity?: number;
    isActive?: boolean;
}
declare const UpdateBatchDto_base: import("@nestjs/common").Type<Partial<CreateBatchDto>>;
export declare class UpdateBatchDto extends UpdateBatchDto_base {
}
export declare class BatchQueryOptionsDto extends PageOptionsDto {
    readonly courseId?: string;
    readonly branchId?: string;
    readonly isActive?: string;
}
export {};
