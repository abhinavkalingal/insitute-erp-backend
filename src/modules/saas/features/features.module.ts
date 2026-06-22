import { SaasEnforcementService } from '@core/services/saas-enforcement.service';
import { Module } from '@nestjs/common';

import { PlanFeaturesController } from './controllers/plan-features/plan-features.controller';
import { SaasFeaturesController } from './controllers/saas-features/saas-features.controller';
import { PlanFeaturesService } from './services/plan-features/plan-features.service';
import { SaasFeaturesService } from './services/saas-features/saas-features.service';

@Module({
  controllers: [SaasFeaturesController, PlanFeaturesController],
  providers: [SaasFeaturesService, PlanFeaturesService, SaasEnforcementService],
  exports: [SaasEnforcementService]})
export class FeaturesModule {}
