import { SaasEnforcementService } from "../../../../../core/services/saas-enforcement.service";
import { PrismaMasterService } from "../../../../../infrastructure/database/prisma-master.service";
import { UpdateInstituteBrandingDto } from '../../dto/institute-branding.dto';
export declare class WhiteLabelService {
    private readonly prisma;
    private readonly saasEnforcement;
    constructor(prisma: PrismaMasterService, saasEnforcement: SaasEnforcementService);
    getBranding(instituteId: string): Promise<{
        id: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        instituteId: string;
        faviconUrl: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        loginBackgroundUrl: string | null;
        loginLayout: string | null;
        hideSaasBranding: boolean | null;
        colors: import("@prisma-master/client/runtime/client").JsonValue | null;
        fonts: import("@prisma-master/client/runtime/client").JsonValue | null;
        customCss: string | null;
    }>;
    updateBranding(instituteId: string, updateDto: UpdateInstituteBrandingDto): Promise<{
        id: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        instituteId: string;
        faviconUrl: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        loginBackgroundUrl: string | null;
        loginLayout: string | null;
        hideSaasBranding: boolean | null;
        colors: import("@prisma-master/client/runtime/client").JsonValue | null;
        fonts: import("@prisma-master/client/runtime/client").JsonValue | null;
        customCss: string | null;
    }>;
    getPublicBrandingByDomain(domain: string): Promise<{
        instituteName: string;
        logoUrl: string | null;
        faviconUrl: string | null;
        primaryColor: string;
        secondaryColor: string;
        loginBackgroundUrl: string | null;
        loginLayout: string;
        hideSaasBranding: boolean;
    }>;
}
