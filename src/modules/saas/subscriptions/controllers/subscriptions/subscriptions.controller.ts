import { CurrentInstitute } from '@core/decorators/current-institute.decorator';
import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SubscribeDto, UpgradeDowngradeDto } from '../../dto/subscription.dto';
import { SubscriptionsService } from '../../services/subscriptions/subscriptions.service';

@ApiTags('SaaS / Subscriptions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('saas/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('my-subscription')
  @RequirePermissions('read:saas') // Institute Admins should have this
  @ApiOperation({ summary: 'Get current institute subscription details and history' })
  getMySubscription(@CurrentInstitute() instituteId: string) {
    return this.subscriptionsService.getMySubscription(instituteId);
  }

  @Post('subscribe')
  @RequirePermissions('update:saas')
  @ApiOperation({ summary: 'Subscribe to a plan (if not already subscribed)' })
  subscribe(@CurrentInstitute() instituteId: string, @Body() subscribeDto: SubscribeDto) {
    return this.subscriptionsService.subscribe(instituteId, subscribeDto);
  }

  @Post('change-plan')
  @RequirePermissions('update:saas')
  @ApiOperation({ summary: 'Upgrade or Downgrade to a different plan' })
  changePlan(@CurrentInstitute() instituteId: string, @Body() changeDto: UpgradeDowngradeDto) {
    return this.subscriptionsService.changePlan(instituteId, changeDto);
  }

  @Post('cancel')
  @RequirePermissions('update:saas')
  @ApiOperation({ summary: 'Cancel subscription (takes effect at period end)' })
  cancel(@CurrentInstitute() instituteId: string) {
    return this.subscriptionsService.cancel(instituteId);
  }

  @Post('renew')
  @RequirePermissions('update:saas')
  @ApiOperation({ summary: 'Manually renew an active subscription or revoke cancellation' })
  renew(@CurrentInstitute() instituteId: string) {
    return this.subscriptionsService.renew(instituteId);
  }
}

