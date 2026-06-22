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
  CreateSaasFeatureDto,
  SaasFeatureQueryOptionsDto,
  UpdateSaasFeatureDto} from '../../dto/saas-feature.dto';
import { SaasFeaturesService } from '../../services/saas-features/saas-features.service';

@ApiTags('SaaS / Features Catalog')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('saas/features')
export class SaasFeaturesController {
  constructor(private readonly saasFeaturesService: SaasFeaturesService) {}

  @Post()
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Create a new feature in the global SaaS catalog' })
  create(@Body() createDto: CreateSaasFeatureDto) {
    return this.saasFeaturesService.create(createDto);
  }

  @Get()
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Get all global SaaS features' })
  @ApiPaginatedResponse(CreateSaasFeatureDto)
  findAll(@Query() queryOptions: SaasFeatureQueryOptionsDto) {
    return this.saasFeaturesService.findAll(queryOptions);
  }

  @Get(':id')
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Get a specific SaaS feature by ID' })
  findOne(@Param('id') id: string) {
    return this.saasFeaturesService.findOne(id);
  }

  @Patch(':id')
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Update a SaaS feature' })
  update(@Param('id') id: string, @Body() updateDto: UpdateSaasFeatureDto) {
    return this.saasFeaturesService.update(id, updateDto);
  }

  @Delete(':id')
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Delete a SaaS feature' })
  remove(@Param('id') id: string) {
    return this.saasFeaturesService.remove(id);
  }
}
