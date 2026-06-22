import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';

import { AnalyticsService } from './analytics.service';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';

@ApiTags('Analytics')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @RequirePermissions('read:analytics')
  @ApiOperation({ summary: 'Get high-level dashboard overview' })
  getDashboardOverview(
    
    @Query() query: AnalyticsQueryDto,
  ) {
    return this.analyticsService.getDashboardOverview( query);
  }

  @Get('students')
  @RequirePermissions('read:analytics')
  @ApiOperation({ summary: 'Get student analytics' })
  getStudentAnalytics(
    
    @Query() query: AnalyticsQueryDto,
  ) {
    return this.analyticsService.getStudentAnalytics( query);
  }

  @Get('revenue')
  @RequirePermissions('read:analytics')
  @ApiOperation({ summary: 'Get revenue and financial analytics' })
  getRevenueAnalytics(
    
    @Query() query: AnalyticsQueryDto,
  ) {
    return this.analyticsService.getRevenueAnalytics( query);
  }

  @Get('attendance')
  @RequirePermissions('read:analytics')
  @ApiOperation({ summary: 'Get attendance analytics' })
  getAttendanceAnalytics(
    
    @Query() query: AnalyticsQueryDto,
  ) {
    return this.analyticsService.getAttendanceAnalytics( query);
  }

  @Get('courses')
  @RequirePermissions('read:analytics')
  @ApiOperation({ summary: 'Get course and batch analytics' })
  getCourseAnalytics(
    
    @Query() query: AnalyticsQueryDto,
  ) {
    return this.analyticsService.getCourseAnalytics( query);
  }

  @Get('faculty')
  @RequirePermissions('read:analytics')
  @ApiOperation({ summary: 'Get faculty and staff analytics' })
  getFacultyAnalytics(
    
    @Query() query: AnalyticsQueryDto,
  ) {
    return this.analyticsService.getFacultyAnalytics( query);
  }
}
