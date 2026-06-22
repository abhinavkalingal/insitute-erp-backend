import { Module } from '@nestjs/common';

import { SuperAdminDashboardController } from './controllers/super-admin-dashboard/super-admin-dashboard.controller';
import { SuperAdminDashboardService } from './services/super-admin-dashboard/super-admin-dashboard.service';

@Module({
  providers: [SuperAdminDashboardService],
  controllers: [SuperAdminDashboardController]})
export class SuperAdminModule {}
