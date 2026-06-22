import { Body, Controller, Get, Param, Post, Res, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';

import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';

import { ReportsService } from './services/reports.service';
import { ExportService } from './services/export.service';
import { CreateSavedReportDto } from './dto/create-saved-report.dto';
import { ExecuteReportDto, ExportFormat } from './dto/execute-report.dto';
import { ScheduleReportDto } from './dto/schedule-report.dto';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly exportService: ExportService,
  ) {}

  @Post('execute')
  @RequirePermissions('read:analytics')
  @ApiOperation({ summary: 'Execute a dynamic report and get JSON data' })
  executeReport(
    
    @Body() executeDto: ExecuteReportDto,
  ) {
    return this.reportsService.executeReport( executeDto);
  }

  @Post('export')
  @RequirePermissions('read:analytics')
  @ApiOperation({ summary: 'Execute a dynamic report and export as file' })
  async exportReport(
    
    @Body() executeDto: ExecuteReportDto,
    @Res() res: Response,
  ) {
    const data = await this.reportsService.executeReport( executeDto);

    switch (executeDto.format) {
      case ExportFormat.CSV: {
        const csv = await this.exportService.generateCsv(data);
        res.header('Content-Type', 'text/csv');
        res.attachment(`report_${Date.now()}.csv`);
        return res.send(csv);
      }
      case ExportFormat.EXCEL: {
        const buffer = await this.exportService.generateExcel(data);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.attachment(`report_${Date.now()}.xlsx`);
        return res.send(buffer);
      }
      case ExportFormat.PDF: {
        const buffer = await this.exportService.generatePdf(data, `Report: ${executeDto.module}`);
        res.header('Content-Type', 'application/pdf');
        res.attachment(`report_${Date.now()}.pdf`);
        return res.send(buffer);
      }
      default:
        return res.json(data);
    }
  }

  @Post('saved')
  @RequirePermissions('update:analytics')
  @ApiOperation({ summary: 'Save a report configuration' })
  saveReport(
    
    @Req() req: any,
    @Body() createDto: CreateSavedReportDto,
  ) {
    const userId = req.user?.id || req.user?.sub;
    return this.reportsService.saveReport( userId, createDto);
  }

  @Get('saved')
  @RequirePermissions('read:analytics')
  @ApiOperation({ summary: 'Get all saved reports' })
  getSavedReports() {
    return this.reportsService.getSavedReports();
  }

  @Get('saved/:id')
  @RequirePermissions('read:analytics')
  @ApiOperation({ summary: 'Get a specific saved report' })
  getSavedReportById(
    
    @Param('id') id: string,
  ) {
    return this.reportsService.getSavedReportById( id);
  }

  @Post('scheduled')
  @RequirePermissions('update:analytics')
  @ApiOperation({ summary: 'Schedule a report execution' })
  scheduleReport(
    
    @Body() scheduleDto: ScheduleReportDto,
  ) {
    return this.reportsService.scheduleReport( scheduleDto);
  }

  @Get('scheduled')
  @RequirePermissions('read:analytics')
  @ApiOperation({ summary: 'Get all scheduled reports' })
  getScheduledReports() {
    return this.reportsService.getScheduledReports();
  }
}
