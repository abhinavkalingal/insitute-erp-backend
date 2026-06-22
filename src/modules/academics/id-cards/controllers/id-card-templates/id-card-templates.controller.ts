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
  CreateIdTemplateDto,
  IdTemplateQueryOptionsDto,
  UpdateIdTemplateDto} from '../../dto/id-template.dto';
import { IdCardTemplatesService } from '../../services/id-card-templates/id-card-templates.service';

@ApiTags('Academics / ID Card Templates')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('id-card-templates')
export class IdCardTemplatesController {
  constructor(private readonly idCardTemplatesService: IdCardTemplatesService) {}

  @Post()
  @RequirePermissions('create:academics')
  @ApiOperation({ summary: 'Create a new ID Card template' })
  create( @Body() createDto: CreateIdTemplateDto) {
    return this.idCardTemplatesService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all ID Card templates' })
  @ApiPaginatedResponse(CreateIdTemplateDto)
  findAll(
    
    @Query() queryOptions: IdTemplateQueryOptionsDto,
  ) {
    return this.idCardTemplatesService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get a specific ID Card template by ID' })
  findOne( @Param('id') id: string) {
    return this.idCardTemplatesService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:academics')
  @ApiOperation({ summary: 'Update an ID Card template' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateIdTemplateDto,
  ) {
    return this.idCardTemplatesService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:academics')
  @ApiOperation({ summary: 'Delete an ID Card template' })
  remove( @Param('id') id: string) {
    return this.idCardTemplatesService.remove(id, );
  }
}
