import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare enum MaterialType {
    DOCUMENT = "DOCUMENT",
    VIDEO_LINK = "VIDEO_LINK"
}
export declare class CreateMaterialDto {
    categoryId: string;
    title: string;
    description?: string;
    type: string;
    fileUrl?: string;
    videoUrl?: string;
    staffId: string;
    subjectId: string;
    courseId?: string;
    batchId?: string;
}
declare const UpdateMaterialDto_base: import("@nestjs/common").Type<Partial<CreateMaterialDto>>;
export declare class UpdateMaterialDto extends UpdateMaterialDto_base {
}
export declare class MaterialQueryOptionsDto extends PageOptionsDto {
    readonly categoryId?: string;
    readonly subjectId?: string;
    readonly courseId?: string;
    readonly batchId?: string;
    readonly staffId?: string;
}
export {};
