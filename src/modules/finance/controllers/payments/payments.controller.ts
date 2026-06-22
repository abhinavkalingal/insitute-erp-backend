import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePaymentDto, PaymentQueryOptionsDto } from '../../dto/payment.dto';
import { PaymentsService } from '../../services/payments/payments.service';

@ApiTags('Finance / Payments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @RequirePermissions('create:finance')
  @ApiOperation({ summary: 'Record a payment and update invoice status' })
  create( @Body() createDto: CreatePaymentDto) {
    return this.paymentsService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all payments with pagination' })
  @ApiPaginatedResponse(CreatePaymentDto)
  findAll( @Query() queryOptions: PaymentQueryOptionsDto) {
    return this.paymentsService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get payment by ID' })
  findOne( @Param('id') id: string) {
    return this.paymentsService.findOne(id, );
  }
}
