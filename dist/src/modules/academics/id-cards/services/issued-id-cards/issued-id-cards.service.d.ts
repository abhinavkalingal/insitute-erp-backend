import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { IssuedIdCardQueryOptionsDto, IssueIdCardDto } from '../../dto/issue-id-card.dto';
export declare class IssuedIdCardsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private generateCardNumber;
    issue(issueDto: IssueIdCardDto): Promise<{
        card: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            staffId: string | null;
            studentId: string | null;
            templateId: string;
            issueDate: Date;
            holderName: string | null;
            validUntil: Date | null;
            barcodeData: string | null;
            cardNumber: string;
        };
        renderedHtml: string;
        backgroundUrl: string | null;
    }>;
    findAll(queryOptions: IssuedIdCardQueryOptionsDto): Promise<PageDto<{
        template: {
            name: string;
            roleType: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        staffId: string | null;
        studentId: string | null;
        templateId: string;
        issueDate: Date;
        holderName: string | null;
        validUntil: Date | null;
        barcodeData: string | null;
        cardNumber: string;
    }>>;
    revokeCard(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        staffId: string | null;
        studentId: string | null;
        templateId: string;
        issueDate: Date;
        holderName: string | null;
        validUntil: Date | null;
        barcodeData: string | null;
        cardNumber: string;
    }>;
    verifyCard(cardNumber: string): Promise<{
        isValid: boolean;
        status: string;
        issuedBy: string;
        holderName: string | null;
        roleType: string;
        issueDate: Date;
        validUntil: Date | null;
        cardNumber: string;
    }>;
}
