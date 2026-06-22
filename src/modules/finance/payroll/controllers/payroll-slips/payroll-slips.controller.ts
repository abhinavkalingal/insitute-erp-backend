import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  GeneratePayrollSlipDto,
  PayPayrollSlipDto,
  PayrollSlipQueryOptionsDto} from '../../dto/payroll-slip.dto';
import { PayrollSlipsService } from '../../services/payroll-slips/payroll-slips.service';

@ApiTags('Finance / Payroll / Slips')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('payroll-slips')
export class PayrollSlipsController {
  constructor(private readonly payrollSlipsService: PayrollSlipsService) {}

  @Post('generate')
  @RequirePermissions('create:finance')
  @ApiOperation({
    summary: 'Generate a payroll slip for a staff member (Snapshots salary and applies loans)'})
  generate( @Body() generateDto: GeneratePayrollSlipDto) {
    return this.payrollSlipsService.generate( generateDto);
  }

  @Post(':id/pay')
  @RequirePermissions('update:finance')
  @ApiOperation({ summary: 'Mark a payroll slip as PAID and deduct loan balances' })
  paySlip(
    
    @Param('id') id: string,
    @Body() payDto: PayPayrollSlipDto,
  ) {
    return this.payrollSlipsService.paySlip(id,  payDto);
  }

  @Get()
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all payroll slips' })
  @ApiPaginatedResponse(GeneratePayrollSlipDto)
  findAll(
    
    @Query() queryOptions: PayrollSlipQueryOptionsDto,
  ) {
    return this.payrollSlipsService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get a specific payroll slip by ID' })
  findOne( @Param('id') id: string) {
    return this.payrollSlipsService.findOne(id, );
  }
}
