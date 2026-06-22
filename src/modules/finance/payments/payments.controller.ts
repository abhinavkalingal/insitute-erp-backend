import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CollectPaymentDto, PaymentQueryOptionsDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';

@ApiTags('Finance / Payments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('collect')
  @RequirePermissions('create:finance')
  @ApiOperation({ summary: 'Collect a payment against an invoice' })
  collectPayment( @Body() collectDto: CollectPaymentDto) {
    return this.paymentsService.collectPayment( collectDto);
  }

  @Post(':id/refund')
  @RequirePermissions('update:finance')
  @ApiOperation({ summary: 'Refund a payment and update the invoice balance' })
  refundPayment( @Param('id') id: string) {
    return this.paymentsService.refundPayment(id, );
  }

  @Get()
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all payments / payment history' })
  @ApiPaginatedResponse(CollectPaymentDto) // Returning standard dto for swagger structure
  findAll( @Query() queryOptions: PaymentQueryOptionsDto) {
    return this.paymentsService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get a specific payment receipt by ID' })
  findOne( @Param('id') id: string) {
    return this.paymentsService.findOne(id, );
  }
}
