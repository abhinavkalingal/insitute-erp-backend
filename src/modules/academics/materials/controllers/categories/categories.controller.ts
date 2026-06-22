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
  CreateMaterialCategoryDto,
  MaterialCategoryQueryOptionsDto,
  UpdateMaterialCategoryDto} from '../../dto/category.dto';
import { CategoriesService } from '../../services/categories/categories.service';

@ApiTags('Academics / Material Categories')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('material-categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @RequirePermissions('create:academics')
  @ApiOperation({ summary: 'Create a new material category' })
  create( @Body() createDto: CreateMaterialCategoryDto) {
    return this.categoriesService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all material categories with pagination' })
  @ApiPaginatedResponse(CreateMaterialCategoryDto)
  findAll(
    
    @Query() queryOptions: MaterialCategoryQueryOptionsDto,
  ) {
    return this.categoriesService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get category by ID' })
  findOne( @Param('id') id: string) {
    return this.categoriesService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:academics')
  @ApiOperation({ summary: 'Update a category' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateMaterialCategoryDto,
  ) {
    return this.categoriesService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:academics')
  @ApiOperation({ summary: 'Delete a category' })
  remove( @Param('id') id: string) {
    return this.categoriesService.remove(id, );
  }
}
