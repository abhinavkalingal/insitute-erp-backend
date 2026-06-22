import { Module } from '@nestjs/common';

import { SaasWebhooksController } from './controllers/saas-webhooks/saas-webhooks.controller';
import { PaymentGatewayService } from './services/payment-gateway/payment-gateway.service';

@Module({
  controllers: [SaasWebhooksController],
  providers: [PaymentGatewayService],
  exports: [PaymentGatewayService]})
export class PaymentGatewayModule {}
