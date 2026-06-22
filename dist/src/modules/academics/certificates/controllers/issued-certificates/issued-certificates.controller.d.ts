import { IssueCertificateDto, IssuedCertificateQueryOptionsDto } from '../../dto/issue-certificate.dto';
import { IssuedCertificatesService } from '../../services/issued-certificates/issued-certificates.service';
export declare class IssuedCertificatesController {
    private readonly issuedCertificatesService;
    constructor(issuedCertificatesService: IssuedCertificatesService);
    issue(issueDto: IssueCertificateDto): Promise<{
        certificate: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            studentId: string;
            fileUrl: string | null;
            templateId: string;
            certificateNumber: string;
            issueDate: Date;
        };
        renderedHtml: string;
        backgroundUrl: string | null;
    }>;
    findAll(queryOptions: IssuedCertificateQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        student: {
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            status: string;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
        };
        template: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        studentId: string;
        fileUrl: string | null;
        templateId: string;
        certificateNumber: string;
        issueDate: Date;
    }>>;
    verifyQrCode(certificateNumber: string): Promise<{
        isValid: boolean;
        issuedBy: string;
        awardedTo: string;
        certificateName: string;
        issueDate: Date;
        certificateNumber: string;
    }>;
}
