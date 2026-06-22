import { CurrentInstitute } from '@core/decorators/current-institute.decorator';
import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GenerateSaasInvoiceDto, SaasInvoiceQueryOptionsDto } from '../../dto/saas-invoice.dto';
import { SaasInvoicesService } from '../../services/saas-invoices/saas-invoices.service';

@ApiTags('SaaS / Invoices')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('saas/billing/invoices')
export class SaasInvoicesController {
  constructor(private readonly saasInvoicesService: SaasInvoicesService) {}

  @Post()
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Generate a new SaaS Invoice manually' })
  generateInvoice(@CurrentInstitute() instituteId: string, @Body() generateDto: GenerateSaasInvoiceDto) {
    return this.saasInvoicesService.generateInvoice(instituteId, generateDto);
  }

  @Get()
  @RequirePermissions('read:saas')
  @ApiOperation({ summary: 'Get all SaaS Invoices' })
  @ApiPaginatedResponse(GenerateSaasInvoiceDto)
  findAll(@Req() req: any, @Query() queryOptions: SaasInvoiceQueryOptionsDto) {
    const user = req.user;
    let instituteId: string | null = null;
    if (user.isSuperAdmin) {
      instituteId = (req.headers['x-institute-id'] as string) || null;
    } else {
      instituteId = user.instituteId;
    }
    return this.saasInvoicesService.findAll(instituteId, queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:saas')
  @ApiOperation({ summary: 'Get a specific SaaS Invoice by ID' })
  findOne(@Param('id') id: string) {
    return this.saasInvoicesService.findOne(id);
  }

  @Patch(':id/void')
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Void an unpaid SaaS Invoice' })
  voidInvoice(@Param('id') id: string) {
    return this.saasInvoicesService.voidInvoice(id);
  }
}
