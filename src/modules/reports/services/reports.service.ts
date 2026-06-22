import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { CreateSavedReportDto, ReportModuleType } from '../dto/create-saved-report.dto';
import { ExecuteReportDto } from '../dto/execute-report.dto';
import { ScheduleReportDto } from '../dto/schedule-report.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Translates module names into Prisma delegate objects
   */
  private getPrismaDelegate(module: ReportModuleType) {
    switch (module) {
      case ReportModuleType.STUDENTS:
        return this.prisma.student;
      case ReportModuleType.STAFF:
        return this.prisma.staff;
      case ReportModuleType.FINANCE:
        return this.prisma.invoice;
      case ReportModuleType.ATTENDANCE:
        return this.prisma.attendanceRecord;
      case ReportModuleType.ACADEMICS:
        return this.prisma.course;
      default:
        throw new BadRequestException('Invalid report module');
    }
  }

  /**
   * Executes a dynamic query against the database
   */
  async executeReport( executeDto: ExecuteReportDto) {
    const delegate = this.getPrismaDelegate(executeDto.module);

    let parsedFilters = {};
    if (executeDto.filters) {
      try {
        parsedFilters = JSON.parse(executeDto.filters);
      } catch (e) {
        throw new BadRequestException('Invalid JSON for filters');
      }
    }

    let parsedColumns = {};
    if (executeDto.columns) {
      try {
        const cols = JSON.parse(executeDto.columns);
        if (Array.isArray(cols)) {
          cols.forEach((col) => {
            parsedColumns[col] = true;
          });
        }
      } catch (e) {
        throw new BadRequestException('Invalid JSON for columns. Must be an array of strings.');
      }
    }

    const queryArgs: any = {
      where: {
        
        ...parsedFilters}};

    if (Object.keys(parsedColumns).length > 0) {
      queryArgs.select = parsedColumns;
    }

    try {
      // @ts-ignore - Dynamic generic invocation
      const results = await delegate.findMany(queryArgs);
      return results;
    } catch (e) {
      throw new BadRequestException('Failed to execute dynamic report. Check filters and columns.');
    }
  }

  async saveReport( userId: string, createDto: CreateSavedReportDto) {
    return this.prisma.savedReport.create({
      data: {
        
        userId,
        name: createDto.name,
        description: createDto.description,
        module: createDto.module,
        filters: createDto.filters,
        columns: createDto.columns}});
  }

  async getSavedReports( userId?: string) {
    const where: any = { };
    if (userId) {
      where.userId = userId;
    }
    return this.prisma.savedReport.findMany({ where });
  }

  async getSavedReportById( reportId: string) {
    const report = await this.prisma.savedReport.findFirst({
      where: {  id: reportId }});
    if (!report) throw new NotFoundException('Saved report not found');
    return report;
  }

  async scheduleReport( scheduleDto: ScheduleReportDto) {
    // Verify saved report exists
    await this.getSavedReportById( scheduleDto.savedReportId);

    return this.prisma.scheduledReport.create({
      data: {
        
        savedReportId: scheduleDto.savedReportId,
        frequency: scheduleDto.frequency,
        format: scheduleDto.format,
        recipients: scheduleDto.recipients}});
  }

  async getScheduledReports() {
    return this.prisma.scheduledReport.findMany({
      where: { },
      include: {
        savedReport: true}});
  }
}
