import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { PrismaMasterService } from './prisma-master.service';
import { PrismaTenantService } from './prisma-tenant.service';

@Global()
@Module({
  providers: [PrismaService, PrismaMasterService, PrismaTenantService],
  exports: [PrismaService, PrismaMasterService, PrismaTenantService]})
export class DatabaseModule {}
