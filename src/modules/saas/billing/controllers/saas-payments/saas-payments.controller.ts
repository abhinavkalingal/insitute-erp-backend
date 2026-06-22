import { CurrentInstitute } from '@core/decorators/current-institute.decorator';
import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  InitiateSaasPaymentDto,
  SaasPaymentQueryOptionsDto,
  UpdateSaasPaymentStatusDto} from '../../dto/saas-payment.dto';
import { SaasPaymentsService } from '../../services/saas-payments/saas-payments.service';

@ApiTags('SaaS / Payments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('saas/billing/payments')
export class SaasPaymentsController {
  constructor(private readonly saasPaymentsService: SaasPaymentsService) {}

  @Post()
  @RequirePermissions('update:saas')
  @ApiOperation({ summary: 'Initiate a new payment attempt for an invoice' })
  initiatePayment(
    @CurrentInstitute() instituteId: string,
    @Body() initiateDto: InitiateSaasPaymentDto,
  ) {
    return this.saasPaymentsService.initiatePayment(instituteId, initiateDto);
  }

  @Patch(':id/status')
  @RequirePermissions('manage:saas') // Super admin only, or webhook via Gateway
  @ApiOperation({ summary: 'Update the status of a payment (e.g. from PENDING to SUCCESS)' })
  updatePaymentStatus(@Param('id') id: string, @Body() updateDto: UpdateSaasPaymentStatusDto) {
    return this.saasPaymentsService.updatePaymentStatus(id, updateDto);
  }

  @Get()
  @RequirePermissions('read:saas')
  @ApiOperation({ summary: 'Get all SaaS Payments' })
  @ApiPaginatedResponse(InitiateSaasPaymentDto)
  findAll(@CurrentInstitute() instituteId: string, @Query() queryOptions: SaasPaymentQueryOptionsDto) {
    return this.saasPaymentsService.findAll(instituteId, queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:saas')
  @ApiOperation({ summary: 'Get a specific SaaS Payment by ID' })
  findOne(@Param('id') id: string) {
    return this.saasPaymentsService.findOne(id);
  }
}
