export declare class PaymentGatewayService {
    private readonly logger;
    private razorpayInstance;
    private readonly webhookSecret;
    constructor();
    createOrder(amount: number, receiptId: string, currency?: string): Promise<any>;
    verifyWebhookSignature(payload: string, signature: string): boolean;
}
