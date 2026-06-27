import { UpdateInstituteBrandingDto } from '../../dto/institute-branding.dto';
import { WhiteLabelService } from '../../services/white-label/white-label.service';
export declare class WhiteLabelController {
    private readonly whiteLabelService;
    constructor(whiteLabelService: WhiteLabelService);
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
}
