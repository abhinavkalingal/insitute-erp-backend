import { RegisterCustomDomainDto } from '../../dto/custom-domain.dto';
import { CustomDomainsService } from '../../services/custom-domains/custom-domains.service';
export declare class CustomDomainsController {
    private readonly customDomainsService;
    constructor(customDomainsService: CustomDomainsService);
    getDomain(instituteId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        domain: string;
        instituteId: string;
        status: string;
        sslStatus: string | null;
        verificationCode: string | null;
    } | null>;
    registerDomain(instituteId: string, dto: RegisterCustomDomainDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        domain: string;
        instituteId: string;
        status: string;
        sslStatus: string | null;
        verificationCode: string | null;
    }>;
    verifyDomain(instituteId: string): Promise<{
        message: string;
        customDomain: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            domain: string;
            instituteId: string;
            status: string;
            sslStatus: string | null;
            verificationCode: string | null;
        };
    }>;
    removeDomain(instituteId: string): Promise<{
        message: string;
    }>;
}
