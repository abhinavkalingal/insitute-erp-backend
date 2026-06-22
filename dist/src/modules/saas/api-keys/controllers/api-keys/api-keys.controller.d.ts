import { CreateApiKeyDto } from '../../dto/api-key.dto';
import { ApiKeysService } from '../../services/api-keys/api-keys.service';
export declare class ApiKeysController {
    private readonly apiKeysService;
    constructor(apiKeysService: ApiKeysService);
    createKey(instituteId: string, dto: CreateApiKeyDto): Promise<{
        message: string;
        id: string;
        name: string;
        rawKey: string;
        expiresAt: Date | null;
    }>;
    listKeys(instituteId: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        isActive: boolean;
        prefix: string | null;
        lastUsedAt: Date | null;
        expiresAt: Date | null;
    }[]>;
    revokeKey(instituteId: string, id: string): Promise<{
        message: string;
    }>;
}
