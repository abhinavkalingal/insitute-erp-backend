import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SuperAdminDashboardService } from '../../services/super-admin-dashboard/super-admin-dashboard.service';

@ApiTags('SaaS / Super Admin')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('saas/super-admin/dashboard')
export class SuperAdminDashboardController {
  constructor(private readonly dashboardService: SuperAdminDashboardService) {}

  @Get()
  // Ensure only platform super admins can access this route
  // For MVP, we'll use a specific permission that should not be granted to standard tenants
  @RequirePermissions('manage:platform')
  @ApiOperation({ summary: 'Get global SaaS platform metrics' })
  getDashboardData() {
    return this.dashboardService.getDashboardData();
  }

  @Get('health')
  @RequirePermissions('manage:platform')
  @ApiOperation({ summary: 'Get real-time OS health metrics' })
  getHealthData() {
    return this.dashboardService.getSystemHealth();
  }
}
