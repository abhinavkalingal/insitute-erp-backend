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
  CreateFeeStructureDto,
  FeeStructureQueryOptionsDto,
  UpdateFeeStructureDto} from '../../dto/fee-structure.dto';
import { FeeStructuresService } from '../../services/fee-structures/fee-structures.service';

@ApiTags('Finance / Fee Structures')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('fee-structures')
export class FeeStructuresController {
  constructor(private readonly feeStructuresService: FeeStructuresService) {}

  @Post()
  @RequirePermissions('create:finance')
  @ApiOperation({ summary: 'Create a new fee structure' })
  create( @Body() createDto: CreateFeeStructureDto) {
    return this.feeStructuresService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all fee structures' })
  @ApiPaginatedResponse(CreateFeeStructureDto)
  findAll(
    
    @Query() queryOptions: FeeStructureQueryOptionsDto,
  ) {
    return this.feeStructuresService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get a specific fee structure by ID' })
  findOne( @Param('id') id: string) {
    return this.feeStructuresService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:finance')
  @ApiOperation({ summary: 'Update a fee structure' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateFeeStructureDto,
  ) {
    return this.feeStructuresService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:finance')
  @ApiOperation({ summary: 'Delete a fee structure' })
  remove( @Param('id') id: string) {
    return this.feeStructuresService.remove(id, );
  }
}
