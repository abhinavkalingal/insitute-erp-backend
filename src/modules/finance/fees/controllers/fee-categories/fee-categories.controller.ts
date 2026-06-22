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
  FeeCategoryQueryOptionsDto,
  UpdateFeeCategoryDto} from '../../dto/fee-category.dto';
import { FeeCategoriesService } from '../../services/fee-categories/fee-categories.service';

@ApiTags('Finance / Fee Categories')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('fee-categories')
export class FeeCategoriesController {
  constructor(private readonly feeCategoriesService: FeeCategoriesService) {}

  @Post()
  @RequirePermissions('create:finance')
  @ApiOperation({ summary: 'Create a new fee category' })
  create( @Body() createDto: CreateFeeCategoryDto) {
    return this.feeCategoriesService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all fee categories' })
  @ApiPaginatedResponse(CreateFeeCategoryDto)
  findAll(
    
    @Query() queryOptions: FeeCategoryQueryOptionsDto,
  ) {
    return this.feeCategoriesService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get a specific fee category by ID' })
  findOne( @Param('id') id: string) {
    return this.feeCategoriesService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:finance')
  @ApiOperation({ summary: 'Update a fee category' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateFeeCategoryDto,
  ) {
    return this.feeCategoriesService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:finance')
  @ApiOperation({ summary: 'Delete a fee category' })
  remove( @Param('id') id: string) {
    return this.feeCategoriesService.remove(id, );
  }
}
