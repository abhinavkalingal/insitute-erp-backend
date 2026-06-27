import { SaasEnforcementService } from "../../../../../core/services/saas-enforcement.service";
import { PrismaMasterService } from "../../../../../infrastructure/database/prisma-master.service";
import { CreateApiKeyDto } from '../../dto/api-key.dto';
export declare class ApiKeysService {
    private readonly prisma;
    private readonly saasEnforcement;
    private readonly logger;
    constructor(prisma: PrismaMasterService, saasEnforcement: SaasEnforcementService);
    createKey(instituteId: string, dto: CreateApiKeyDto): Promise<{
        message: string;
        id: string;
        name: string;
        rawKey: string;
        expiresAt: Date | null;
    }>;
    listKeys(instituteId: string): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        prefix: string | null;
        lastUsedAt: Date | null;
        expiresAt: Date | null;
    }[]>;
    revokeKey(instituteId: string, id: string): Promise<{
        message: string;
    }>;
    trackUsage(id: string): Promise<void>;
    validateKey(rawKey: string): Promise<string | null>;
}
