import { Module } from '@nestjs/common';

import { FeaturesModule } from '../features/features.module';
import { WebhooksController } from './controllers/webhooks/webhooks.controller';
import { WebhookDispatcherService } from './services/webhook-dispatcher/webhook-dispatcher.service';
import { WebhookEndpointsService } from './services/webhook-endpoints/webhook-endpoints.service';

@Module({
  imports: [FeaturesModule],
  providers: [WebhookEndpointsService, WebhookDispatcherService],
  controllers: [WebhooksController],
  exports: [WebhookDispatcherService]})
export class WebhooksModule {}
