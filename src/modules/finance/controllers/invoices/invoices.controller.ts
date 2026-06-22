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

import { CreateInvoiceDto, InvoiceQueryOptionsDto, UpdateInvoiceDto } from '../../dto/invoice.dto';
import { InvoicesService } from '../../services/invoices/invoices.service';

@ApiTags('Finance / Invoices')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @RequirePermissions('create:finance')
  @ApiOperation({ summary: 'Create a new invoice with line items' })
  create( @Body() createDto: CreateInvoiceDto) {
    return this.invoicesService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all invoices with pagination' })
  @ApiPaginatedResponse(CreateInvoiceDto)
  findAll( @Query() queryOptions: InvoiceQueryOptionsDto) {
    return this.invoicesService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get invoice by ID (includes items & payments)' })
  findOne( @Param('id') id: string) {
    return this.invoicesService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:finance')
  @ApiOperation({ summary: 'Update an invoice (status or discount)' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateInvoiceDto,
  ) {
    return this.invoicesService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:finance')
  @ApiOperation({ summary: 'Delete an invoice permanently' })
  remove( @Param('id') id: string) {
    return this.invoicesService.remove(id, );
  }
}
