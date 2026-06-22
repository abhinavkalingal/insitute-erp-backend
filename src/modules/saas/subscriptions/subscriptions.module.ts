import { Module } from '@nestjs/common';

import { SubscriptionPlansController } from './controllers/subscription-plans/subscription-plans.controller';
import { SubscriptionsController } from './controllers/subscriptions/subscriptions.controller';
import { SubscriptionPlansService } from './services/subscription-plans/subscription-plans.service';
import { SubscriptionsService } from './services/subscriptions/subscriptions.service';

@Module({
  providers: [SubscriptionPlansService, SubscriptionsService],
  controllers: [SubscriptionPlansController, SubscriptionsController]})
export class SubscriptionsModule {}
