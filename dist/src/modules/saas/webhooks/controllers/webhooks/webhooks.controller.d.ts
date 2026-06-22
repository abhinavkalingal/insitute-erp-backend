import { CreateWebhookEndpointDto } from '../../dto/webhook-endpoint.dto';
import { WebhookEndpointsService } from '../../services/webhook-endpoints/webhook-endpoints.service';
export declare class WebhooksController {
    private readonly webhookEndpointsService;
    constructor(webhookEndpointsService: WebhookEndpointsService);
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
