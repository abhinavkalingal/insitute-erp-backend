import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class CreateTemplateDto {
    name: string;
    contentHtml: string;
    backgroundUrl?: string;
}
declare const UpdateTemplateDto_base: import("@nestjs/common").Type<Partial<CreateTemplateDto>>;
export declare class UpdateTemplateDto extends UpdateTemplateDto_base {
}
export declare class TemplateQueryOptionsDto extends PageOptionsDto {
}
export {};
