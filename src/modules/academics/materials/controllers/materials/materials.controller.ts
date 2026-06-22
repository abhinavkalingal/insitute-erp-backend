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
  CreateMaterialDto,
  MaterialQueryOptionsDto,
  UpdateMaterialDto} from '../../dto/material.dto';
import { MaterialsService } from '../../services/materials/materials.service';

@ApiTags('Academics / Study Materials')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('study-materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @RequirePermissions('create:academics')
  @ApiOperation({ summary: 'Upload/Create study material' })
  create( @Body() createDto: CreateMaterialDto) {
    return this.materialsService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all study materials with pagination' })
  @ApiPaginatedResponse(CreateMaterialDto)
  findAll( @Query() queryOptions: MaterialQueryOptionsDto) {
    return this.materialsService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get study material by ID' })
  findOne( @Param('id') id: string) {
    return this.materialsService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:academics')
  @ApiOperation({ summary: 'Update study material metadata' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateMaterialDto,
  ) {
    return this.materialsService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:academics')
  @ApiOperation({ summary: 'Soft delete study material' })
  remove( @Param('id') id: string) {
    return this.materialsService.remove(id, );
  }
}
