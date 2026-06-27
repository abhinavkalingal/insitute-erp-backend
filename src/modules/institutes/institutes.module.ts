import { StorageModule } from '@modules/storage/storage.module';
import { Module } from '@nestjs/common';

import { InstitutesController } from './institutes.controller';
import { InstitutesService } from './institutes.service';
import { TenantProvisioningService } from './tenant-provisioning.service';

@Module({
  imports: [StorageModule],
  controllers: [InstitutesController],
  providers: [InstitutesService, TenantProvisioningService],
  exports: [InstitutesService, TenantProvisioningService]})
export class InstitutesModule {}
