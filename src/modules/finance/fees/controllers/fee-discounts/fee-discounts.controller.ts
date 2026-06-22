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
  CreateFeeDiscountDto,
  FeeDiscountQueryOptionsDto,
  UpdateFeeDiscountDto} from '../../dto/fee-discount.dto';
import { FeeDiscountsService } from '../../services/fee-discounts/fee-discounts.service';

@ApiTags('Finance / Fee Discounts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('fee-discounts')
export class FeeDiscountsController {
  constructor(private readonly feeDiscountsService: FeeDiscountsService) {}

  @Post()
  @RequirePermissions('create:finance')
  @ApiOperation({ summary: 'Create a new fee discount/scholarship' })
  create( @Body() createDto: CreateFeeDiscountDto) {
    return this.feeDiscountsService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all fee discounts' })
  @ApiPaginatedResponse(CreateFeeDiscountDto)
  findAll(
    
    @Query() queryOptions: FeeDiscountQueryOptionsDto,
  ) {
    return this.feeDiscountsService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get a specific fee discount by ID' })
  findOne( @Param('id') id: string) {
    return this.feeDiscountsService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:finance')
  @ApiOperation({ summary: 'Update a fee discount' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateFeeDiscountDto,
  ) {
    return this.feeDiscountsService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:finance')
  @ApiOperation({ summary: 'Delete a fee discount' })
  remove( @Param('id') id: string) {
    return this.feeDiscountsService.remove(id, );
  }
}
