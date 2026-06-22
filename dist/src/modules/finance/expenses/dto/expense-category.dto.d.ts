import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class CreateExpenseCategoryDto {
    name: string;
    description?: string;
}
declare const UpdateExpenseCategoryDto_base: import("@nestjs/common").Type<Partial<CreateExpenseCategoryDto>>;
export declare class UpdateExpenseCategoryDto extends UpdateExpenseCategoryDto_base {
}
export declare class ExpenseCategoryQueryOptionsDto extends PageOptionsDto {
}
export {};
