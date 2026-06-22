import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class CreateGradeRuleDto {
    gradeName: string;
    minPercent: number;
    maxPercent: number;
    gradePoint: number;
}
declare const UpdateGradeRuleDto_base: import("@nestjs/common").Type<Partial<CreateGradeRuleDto>>;
export declare class UpdateGradeRuleDto extends UpdateGradeRuleDto_base {
}
export declare class GradeRuleQueryOptionsDto extends PageOptionsDto {
}
export {};
