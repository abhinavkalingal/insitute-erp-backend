import { Module } from '@nestjs/common';

import { PaymentGatewayModule } from '../payment-gateway/payment-gateway.module';
import { SaasInvoicesController } from './controllers/saas-invoices/saas-invoices.controller';
import { SaasPaymentsController } from './controllers/saas-payments/saas-payments.controller';
import { SaasInvoicesService } from './services/saas-invoices/saas-invoices.service';
import { SaasPaymentsService } from './services/saas-payments/saas-payments.service';

@Module({
  imports: [PaymentGatewayModule],
  providers: [SaasInvoicesService, SaasPaymentsService],
  controllers: [SaasInvoicesController, SaasPaymentsController]})
export class BillingModule {}
