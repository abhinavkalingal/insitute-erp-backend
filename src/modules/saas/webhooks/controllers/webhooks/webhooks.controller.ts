import { CurrentInstitute } from '@core/decorators/current-institute.decorator';
import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateWebhookEndpointDto } from '../../dto/webhook-endpoint.dto';
import { WebhookEndpointsService } from '../../services/webhook-endpoints/webhook-endpoints.service';

@ApiTags('SaaS / Webhooks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('saas/webhooks')
export class WebhooksController {
  constructor(private readonly webhookEndpointsService: WebhookEndpointsService) {}

  @Post()
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Register a new webhook endpoint' })
  createEndpoint(@CurrentInstitute() instituteId: string, @Body() dto: CreateWebhookEndpointDto) {
    return this.webhookEndpointsService.createEndpoint(instituteId, dto);
  }

  @Get()
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'List all registered webhook endpoints' })
  listEndpoints(@CurrentInstitute() instituteId: string) {
    return this.webhookEndpointsService.listEndpoints(instituteId);
  }

  @Delete(':id')
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Delete a webhook endpoint' })
  deleteEndpoint(@Param('id') id: string, @CurrentInstitute() instituteId: string) {
    return this.webhookEndpointsService.deleteEndpoint(id, instituteId);
  }
}

