import { Module } from '@nestjs/common';

import { FeaturesModule } from '../features/features.module';
import { CustomDomainsController } from './controllers/custom-domains/custom-domains.controller';
import { CustomDomainsService } from './services/custom-domains/custom-domains.service';

@Module({
  imports: [FeaturesModule],
  providers: [CustomDomainsService],
  controllers: [CustomDomainsController]})
export class CustomDomainsModule {}
