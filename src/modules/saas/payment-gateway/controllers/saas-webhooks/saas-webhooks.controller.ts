import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { Controller, ForbiddenException, Headers, Logger, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';

import { PaymentGatewayService } from '../../services/payment-gateway/payment-gateway.service';

@ApiTags('SaaS / Webhooks')
@Controller('saas/billing/webhooks')
export class SaasWebhooksController {
  private readonly logger = new Logger(SaasWebhooksController.name);

  constructor(
    private readonly paymentGatewayService: PaymentGatewayService,
    private readonly prisma: PrismaMasterService,
  ) {}

  @Post('razorpay')
  @ApiOperation({ summary: 'Receive Razorpay Webhooks (payment.captured, payment.failed)' })
  async handleRazorpayWebhook(
    @Headers('x-razorpay-signature') signature: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!signature) {
      throw new ForbiddenException('Missing Razorpay Signature');
    }

    // Use raw body for signature verification if available, otherwise stringify the body.
    // NestJS default body parser parses JSON. In production, raw body access is needed.
    // For this demonstration, we assume `req.body` is available.
    const payloadString = JSON.stringify(req.body);

    const isValid = this.paymentGatewayService.verifyWebhookSignature(payloadString, signature);

    if (!isValid) {
      this.logger.error('Invalid Razorpay Webhook Signature');
      throw new ForbiddenException('Invalid Signature');
    }

    const event = req.body.event;
    const paymentEntity = req.body.payload?.payment?.entity;

    if (!paymentEntity) {
      return res.status(400).send('Missing payment entity');
    }

    const gatewayOrderId = paymentEntity.order_id;
    const transactionId = paymentEntity.id;

    if (!gatewayOrderId) {
      return res.status(400).send('Missing order_id');
    }

    // Find the corresponding SaasPayment
    const saasPayment = await this.prisma.saasPayment.findFirst({
      where: { gatewayOrderId }});

    if (!saasPayment) {
      this.logger.warn(`Received webhook for unknown order_id: ${gatewayOrderId}`);
      return res.status(200).send('OK'); // Return 200 so Razorpay stops retrying
    }

    try {
      if (event === 'payment.captured') {
        // Mark payment as SUCCESS and update Invoice & Subscription
        await this.prisma.$transaction(async (tx) => {
          await tx.saasPayment.update({
            where: { id: saasPayment.id },
            data: { status: 'SUCCESS', transactionId, metadata: req.body }});

          const invoice = await tx.saasInvoice.update({
            where: { id: saasPayment.invoiceId as string },
            data: { status: 'PAID', paidAt: new Date() }});

          if (invoice.subscriptionId) {
            await tx.subscription.update({
              where: { id: invoice.subscriptionId },
              data: { status: 'ACTIVE' }});
          }
        });
        this.logger.log(`Payment captured successfully for invoice ${saasPayment.invoiceId}`);
      } else if (event === 'payment.failed') {
        // Mark payment as FAILED
        await this.prisma.saasPayment.update({
          where: { id: saasPayment.id },
          data: { status: 'FAILED', transactionId, metadata: req.body }});
        this.logger.log(`Payment failed for invoice ${saasPayment.invoiceId}`);
      }

      return res.status(200).send({ status: 'ok' });
    } catch (error) {
      this.logger.error(`Error processing webhook: ${error.message}`);
      return res.status(500).send('Internal Server Error');
    }
  }
}
