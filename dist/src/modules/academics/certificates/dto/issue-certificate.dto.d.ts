import { PageOptionsDto } from "../../../../core/utils/pagination/page-options.dto";
export declare class IssueCertificateDto {
    templateId: string;
    studentId: string;
}
export declare class IssuedCertificateQueryOptionsDto extends PageOptionsDto {
    readonly templateId?: string;
    readonly studentId?: string;
}
