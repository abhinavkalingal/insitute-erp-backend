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
  CreateTemplateDto,
  TemplateQueryOptionsDto,
  UpdateTemplateDto} from '../../dto/template.dto';
import { TemplatesService } from '../../services/templates/templates.service';

@ApiTags('Academics / Certificate Templates')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('certificate-templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @RequirePermissions('create:academics')
  @ApiOperation({ summary: 'Create a new certificate template' })
  create( @Body() createDto: CreateTemplateDto) {
    return this.templatesService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all certificate templates' })
  @ApiPaginatedResponse(CreateTemplateDto)
  findAll( @Query() queryOptions: TemplateQueryOptionsDto) {
    return this.templatesService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get a specific certificate template by ID' })
  findOne( @Param('id') id: string) {
    return this.templatesService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:academics')
  @ApiOperation({ summary: 'Update a certificate template' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateTemplateDto,
  ) {
    return this.templatesService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:academics')
  @ApiOperation({ summary: 'Delete a certificate template' })
  remove( @Param('id') id: string) {
    return this.templatesService.remove(id, );
  }
}
