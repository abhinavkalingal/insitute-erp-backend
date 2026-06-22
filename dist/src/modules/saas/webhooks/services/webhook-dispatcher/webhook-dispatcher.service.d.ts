import { PrismaMasterService } from "../../../../../infrastructure/database/prisma-master.service";
export declare class WebhookDispatcherService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaMasterService);
    dispatchEvent(instituteId: string, eventType: string, payload: any): Promise<void>;
    private sendHttpRequest;
}
