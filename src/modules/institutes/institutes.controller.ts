import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import { StorageService } from '@modules/storage/storage.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateInstituteDto } from './dto/create-institute.dto';
import { InstituteQueryOptionsDto } from './dto/institute-query-options.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { InstitutesService } from './institutes.service';

@ApiTags('Institutes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('institutes')
export class InstitutesController {
  constructor(
    private readonly institutesService: InstitutesService,
    private readonly storageService: StorageService,
  ) {}

  @Post()
  @RequirePermissions('create:institutes')
  @ApiOperation({ summary: 'Create a new institute' })
  create(@Body() createInstituteDto: CreateInstituteDto) {
    return this.institutesService.create(createInstituteDto);
  }

  @Get()
  @RequirePermissions('read:institutes')
  @ApiOperation({ summary: 'Get all institutes with pagination and filters' })
  findAll(@Query() queryOptions: InstituteQueryOptionsDto) {
    return this.institutesService.findAll(queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:institutes')
  @ApiOperation({ summary: 'Get institute by ID' })
  findOne(@Param('id') id: string) {
    return this.institutesService.findOne(id);
  }

  @Patch(':id')
  @RequirePermissions('update:institutes')
  @ApiOperation({ summary: 'Update an institute (including profile and settings)' })
  update(@Param('id') id: string, @Body() updateInstituteDto: UpdateInstituteDto) {
    return this.institutesService.update(id, updateInstituteDto);
  }

  @Post(':id/logo')
  @RequirePermissions('update:institutes')
  @ApiOperation({ summary: 'Upload an institute logo' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'}}}})
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogo(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    const logoUrl = await this.storageService.uploadFile(file);
    return this.institutesService.updateLogo(id, logoUrl);
  }

  @Delete(':id')
  @RequirePermissions('delete:institutes')
  @ApiOperation({ summary: 'Soft delete an institute' })
  remove(@Param('id') id: string) {
    return this.institutesService.remove(id);
  }
}
