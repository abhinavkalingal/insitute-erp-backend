import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AssignPlanFeatureDto, UpdatePlanFeatureDto } from '../../dto/plan-feature.dto';
import { PlanFeaturesService } from '../../services/plan-features/plan-features.service';

@ApiTags('SaaS / Plan Features')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('saas/subscription-plans/:planId/features')
export class PlanFeaturesController {
  constructor(private readonly planFeaturesService: PlanFeaturesService) {}

  @Post()
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Assign a feature to a subscription plan' })
  assignFeature(@Param('planId') planId: string, @Body() assignDto: AssignPlanFeatureDto) {
    return this.planFeaturesService.assignFeatureToPlan(planId, assignDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all features assigned to a specific plan (Public)' })
  getPlanFeatures(@Param('planId') planId: string) {
    // Note: Removed RequirePermissions because the public pricing page needs to read these
    return this.planFeaturesService.getPlanFeatures(planId);
  }

  @Patch(':featureId')
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Update the limit or toggle for a feature on a plan' })
  updatePlanFeature(
    @Param('planId') planId: string,
    @Param('featureId') featureId: string,
    @Body() updateDto: UpdatePlanFeatureDto,
  ) {
    return this.planFeaturesService.updatePlanFeature(planId, featureId, updateDto);
  }

  @Delete(':featureId')
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Remove a feature from a subscription plan' })
  removePlanFeature(@Param('planId') planId: string, @Param('featureId') featureId: string) {
    return this.planFeaturesService.removePlanFeature(planId, featureId);
  }
}
