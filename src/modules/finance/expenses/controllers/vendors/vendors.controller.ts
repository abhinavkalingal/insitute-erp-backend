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

import { CreateVendorDto, UpdateVendorDto, VendorQueryOptionsDto } from '../../dto/vendor.dto';
import { VendorsService } from '../../services/vendors/vendors.service';

@ApiTags('Finance / Vendors')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  @RequirePermissions('create:finance')
  @ApiOperation({ summary: 'Create a new vendor' })
  create( @Body() createDto: CreateVendorDto) {
    return this.vendorsService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all vendors' })
  @ApiPaginatedResponse(CreateVendorDto)
  findAll( @Query() queryOptions: VendorQueryOptionsDto) {
    return this.vendorsService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get a specific vendor by ID' })
  findOne( @Param('id') id: string) {
    return this.vendorsService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:finance')
  @ApiOperation({ summary: 'Update a vendor' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateVendorDto,
  ) {
    return this.vendorsService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:finance')
  @ApiOperation({ summary: 'Delete a vendor' })
  remove( @Param('id') id: string) {
    return this.vendorsService.remove(id, );
  }
}
