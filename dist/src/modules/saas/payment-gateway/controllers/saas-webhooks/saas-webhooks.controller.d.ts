import { PrismaMasterService } from "../../../../../infrastructure/database/prisma-master.service";
import type { Request, Response } from 'express';
import { PaymentGatewayService } from '../../services/payment-gateway/payment-gateway.service';
export declare class SaasWebhooksController {
    private readonly paymentGatewayService;
    private readonly prisma;
    private readonly logger;
    constructor(paymentGatewayService: PaymentGatewayService, prisma: PrismaMasterService);
    handleRazorpayWebhook(signature: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
