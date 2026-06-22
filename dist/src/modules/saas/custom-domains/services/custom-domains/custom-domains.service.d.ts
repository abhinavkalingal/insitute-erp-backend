import { SaasEnforcementService } from "../../../../../core/services/saas-enforcement.service";
import { PrismaMasterService } from "../../../../../infrastructure/database/prisma-master.service";
import { RegisterCustomDomainDto } from '../../dto/custom-domain.dto';
export declare class CustomDomainsService {
    private readonly prisma;
    private readonly saasEnforcement;
    private readonly logger;
    constructor(prisma: PrismaMasterService, saasEnforcement: SaasEnforcementService);
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
