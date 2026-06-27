import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/dashboard')
@UseGuards(AuthGuard('jwt'))
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('reception')
  async getReceptionDashboard() {
    return this.dashboardService.getReceptionDashboard();
  }

  @Get('operations')
  async getOperationsDashboard() {
    return this.dashboardService.getOperationsDashboard();
  }

  @Get('marketing')
  async getMarketingDashboard() {
    return this.dashboardService.getMarketingDashboard();
  }

  @Get('director')
  async getDirectorDashboard() {
    return this.dashboardService.getDirectorDashboard();
  }

  @Get('finance')
  async getFinanceDashboard() {
    return this.dashboardService.getFinanceDashboard();
  }

  @Get('hr')
  async getHrDashboard() {
    return this.dashboardService.getHrDashboard();
  }
}
