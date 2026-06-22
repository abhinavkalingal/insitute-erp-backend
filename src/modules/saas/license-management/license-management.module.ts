import { Module } from '@nestjs/common';

import { FeaturesModule } from '../features/features.module';
import { LicenseManagementController } from './controllers/license-management/license-management.controller';
import { LicenseManagementService } from './services/license-management/license-management.service';

@Module({
  imports: [FeaturesModule],
  providers: [LicenseManagementService],
  controllers: [LicenseManagementController]})
export class LicenseManagementModule {}
