import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

// Use require since @types/razorpay is missing
const Razorpay = require('razorpay');

@Injectable()
export class PaymentGatewayService {
  private readonly logger = new Logger(PaymentGatewayService.name);
  private razorpayInstance: any;
  private readonly webhookSecret: string;

  constructor() {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    this.webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';

    if (key_id && key_secret) {
      this.razorpayInstance = new Razorpay({
        key_id,
        key_secret});
    } else {
      this.logger.warn('Razorpay credentials not found in .env. Payment features will fail.');
    }
  }

  /**
   * Create an order on Razorpay
   * @param amount The amount in standard currency unit (e.g., INR). Will be converted to smallest subunit (paise).
   * @param receiptId A unique identifier linking this to your local invoice/payment
   * @param currency The currency string (default INR)
   */
  async createOrder(amount: number, receiptId: string, currency: string = 'INR') {
    if (!this.razorpayInstance) {
      throw new InternalServerErrorException('Payment Gateway is not configured properly.');
    }

    try {
      const options = {
        amount: Math.round(amount * 100), // convert to paise
        currency,
        receipt: receiptId};

      const order = await this.razorpayInstance.orders.create(options);
      return order; // returns an object containing { id: "order_xyz", ... }
    } catch (error) {
      this.logger.error(`Failed to create Razorpay Order: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to communicate with payment gateway');
    }
  }

  /**
   * Verify the cryptographic signature sent by Razorpay webhook
   * @param payload The raw stringified JSON body of the webhook
   * @param signature The x-razorpay-signature header
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!this.webhookSecret) {
      this.logger.error('RAZORPAY_WEBHOOK_SECRET is not defined. Cannot verify webhook.');
      return false;
    }

    const expectedSignature = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(payload)
      .digest('hex');

    return expectedSignature === signature;
  }
}
