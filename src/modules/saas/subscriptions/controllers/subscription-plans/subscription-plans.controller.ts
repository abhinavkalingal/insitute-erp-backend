import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  CreateSubscriptionPlanDto,
  SubscriptionPlanQueryOptionsDto,
  UpdateSubscriptionPlanDto} from '../../dto/subscription-plan.dto';
import { SubscriptionPlansService } from '../../services/subscription-plans/subscription-plans.service';

@ApiTags('SaaS / Subscription Plans')
@Controller('saas/subscription-plans')
export class SubscriptionPlansController {
  constructor(private readonly subscriptionPlansService: SubscriptionPlansService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('manage:saas') // Only global super admins can create plans
  @ApiOperation({ summary: 'Create a new subscription plan' })
  create(@Body() createDto: CreateSubscriptionPlanDto) {
    return this.subscriptionPlansService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subscription plans (Publicly available for pricing page)' })
  @ApiPaginatedResponse(CreateSubscriptionPlanDto)
  findAll(@Query() queryOptions: SubscriptionPlanQueryOptionsDto) {
    return this.subscriptionPlansService.findAll(queryOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific subscription plan by ID' })
  findOne(@Param('id') id: string) {
    return this.subscriptionPlansService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Update a subscription plan' })
  update(@Param('id') id: string, @Body() updateDto: UpdateSubscriptionPlanDto) {
    return this.subscriptionPlansService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Soft delete (deactivate) a subscription plan' })
  remove(@Param('id') id: string) {
    return this.subscriptionPlansService.remove(id);
  }
}
