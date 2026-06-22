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
  CreateFeeCategoryDto,
  CreateFeeStructureDto,
  FeeCategoryQueryOptionsDto,
  FeeStructureQueryOptionsDto,
  UpdateFeeCategoryDto,
  UpdateFeeStructureDto} from '../../dto/fee.dto';
import { FeesService } from '../../services/fees/fees.service';

@ApiTags('Finance / Fees')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('fees')
export class FeesController {
  constructor(private readonly feesService: FeesService) {}

  // --- Categories ---

  @Post('categories')
  @RequirePermissions('create:finance')
  @ApiOperation({ summary: 'Create a fee category' })
  createCategory( @Body() createDto: CreateFeeCategoryDto) {
    return this.feesService.createCategory( createDto);
  }

  @Get('categories')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all fee categories' })
  @ApiPaginatedResponse(CreateFeeCategoryDto)
  findAllCategories(
    
    @Query() queryOptions: FeeCategoryQueryOptionsDto,
  ) {
    return this.feesService.findAllCategories( queryOptions);
  }

  @Get('categories/:id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get fee category by ID' })
  findOneCategory( @Param('id') id: string) {
    return this.feesService.findOneCategory(id, );
  }

  @Patch('categories/:id')
  @RequirePermissions('update:finance')
  @ApiOperation({ summary: 'Update fee category' })
  updateCategory(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateFeeCategoryDto,
  ) {
    return this.feesService.updateCategory(id,  updateDto);
  }

  @Delete('categories/:id')
  @RequirePermissions('delete:finance')
  @ApiOperation({ summary: 'Delete fee category' })
  removeCategory( @Param('id') id: string) {
    return this.feesService.removeCategory(id, );
  }

  // --- Structures ---

  @Post('structures')
  @RequirePermissions('create:finance')
  @ApiOperation({ summary: 'Create a fee structure' })
  createStructure(
    
    @Body() createDto: CreateFeeStructureDto,
  ) {
    return this.feesService.createStructure( createDto);
  }

  @Get('structures')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all fee structures' })
  @ApiPaginatedResponse(CreateFeeStructureDto)
  findAllStructures(
    
    @Query() queryOptions: FeeStructureQueryOptionsDto,
  ) {
    return this.feesService.findAllStructures( queryOptions);
  }

  @Get('structures/:id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get fee structure by ID' })
  findOneStructure( @Param('id') id: string) {
    return this.feesService.findOneStructure(id, );
  }

  @Patch('structures/:id')
  @RequirePermissions('update:finance')
  @ApiOperation({ summary: 'Update fee structure' })
  updateStructure(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateFeeStructureDto,
  ) {
    return this.feesService.updateStructure(id,  updateDto);
  }

  @Delete('structures/:id')
  @RequirePermissions('delete:finance')
  @ApiOperation({ summary: 'Delete fee structure' })
  removeStructure( @Param('id') id: string) {
    return this.feesService.removeStructure(id, );
  }
}
