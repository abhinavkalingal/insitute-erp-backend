import { CreateWebhookEndpointDto } from '../../dto/webhook-endpoint.dto';
import { WebhookEndpointsService } from '../../services/webhook-endpoints/webhook-endpoints.service';
export declare class WebhooksController {
    private readonly webhookEndpointsService;
    constructor(webhookEndpointsService: WebhookEndpointsService);
    createEndpoint(instituteId: string, dto: CreateWebhookEndpointDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        instituteId: string;
        description: string | null;
        secret: string;
        url: string;
        events: import("@prisma-master/client/runtime/client").JsonValue;
    }>;
    listEndpoints(instituteId: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        instituteId: string;
        description: string | null;
        secret: string;
        url: string;
        events: import("@prisma-master/client/runtime/client").JsonValue;
    }[]>;
    deleteEndpoint(id: string, instituteId: string): Promise<{
        message: string;
    }>;
}
