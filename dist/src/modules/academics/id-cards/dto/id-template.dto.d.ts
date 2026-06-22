import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare enum IdCardRoleType {
    STUDENT = "STUDENT",
    STAFF = "STAFF",
    TEMPORARY = "TEMPORARY"
}
export declare class CreateIdTemplateDto {
    name: string;
    roleType: string;
    contentHtml: string;
    backgroundUrl?: string;
}
declare const UpdateIdTemplateDto_base: import("@nestjs/common").Type<Partial<CreateIdTemplateDto>>;
export declare class UpdateIdTemplateDto extends UpdateIdTemplateDto_base {
}
export declare class IdTemplateQueryOptionsDto extends PageOptionsDto {
    readonly roleType?: string;
}
export {};
