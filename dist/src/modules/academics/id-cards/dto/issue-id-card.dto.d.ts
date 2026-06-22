import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class IssueIdCardDto {
    templateId: string;
    studentId?: string;
    staffId?: string;
    holderName?: string;
    validUntil?: string;
    barcodeData?: string;
}
export declare class IssuedIdCardQueryOptionsDto extends PageOptionsDto {
    readonly templateId?: string;
    readonly studentId?: string;
    readonly staffId?: string;
}
