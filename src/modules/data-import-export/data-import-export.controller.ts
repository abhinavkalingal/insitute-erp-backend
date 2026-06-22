import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';

import { DataImportExportService } from './data-import-export.service';

@ApiTags('Data Import & Export')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('data-import-export')
export class DataImportExportController {
  constructor(private readonly importExportService: DataImportExportService) {}

  @Get('template/:entity')
  @RequirePermissions('manage:institute')
  @ApiOperation({ summary: 'Download a CSV template for an entity' })
  downloadTemplate(@Param('entity') entity: string, @Res() res: Response) {
    if (entity !== 'students') {
      throw new BadRequestException('Templates only available for students currently.');
    }

    const csv = this.importExportService.generateStudentTemplate();
    res.header('Content-Type', 'text/csv');
    res.attachment(`template_${entity}.csv`);
    return res.send(csv);
  }

  @Post('import/:entity')
  @RequirePermissions('manage:institute')
  @ApiOperation({ summary: 'Bulk import data via CSV' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'}}}})
  @UseInterceptors(FileInterceptor('file'))
  async importData(
    
    @Param('entity') entity: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    if (entity !== 'students') {
      throw new BadRequestException('Imports only available for students currently.');
    }

    return this.importExportService.importStudents( file.buffer);
  }
}
