import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { IssueCertificateDto, IssuedCertificateQueryOptionsDto } from '../../dto/issue-certificate.dto';
export declare class IssuedCertificatesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private generateCertificateNumber;
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
    findAll(queryOptions: IssuedCertificateQueryOptionsDto): Promise<PageDto<{
        student: {
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            profile: Prisma.JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            documents: Prisma.JsonValue | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
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
