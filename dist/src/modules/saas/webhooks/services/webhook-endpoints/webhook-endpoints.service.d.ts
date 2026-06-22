import { SaasEnforcementService } from "../../../../../core/services/saas-enforcement.service";
import { PrismaMasterService } from "../../../../../infrastructure/database/prisma-master.service";
import { CreateWebhookEndpointDto } from '../../dto/webhook-endpoint.dto';
export declare class WebhookEndpointsService {
    private readonly prisma;
    private readonly saasEnforcement;
    constructor(prisma: PrismaMasterService, saasEnforcement: SaasEnforcementService);
    createEndpoint(instituteId: string, dto: CreateWebhookEndpointDto): Promise<{
        url: string;
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        instituteId: string;
        secret: string;
        events: import("@prisma-master/client/runtime/client").JsonValue;
    }>;
    listEndpoints(instituteId: string): Promise<{
        url: string;
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        instituteId: string;
        secret: string;
        events: import("@prisma-master/client/runtime/client").JsonValue;
    }[]>;
    deleteEndpoint(id: string, instituteId: string): Promise<{
        message: string;
    }>;
}
