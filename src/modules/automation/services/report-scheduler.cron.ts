import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { ReportsService } from '@modules/reports/services/reports.service';
import { ExportService } from '@modules/reports/services/export.service';
import { ExportFormat } from '@modules/reports/dto/execute-report.dto';

@Injectable()
export class ReportSchedulerCron {
  private readonly logger = new Logger(ReportSchedulerCron.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly reportsService: ReportsService,
    private readonly exportService: ExportService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async handleScheduledReports() {
    this.logger.debug('Running scheduled reports check...');
    await this.processScheduledReports();
  }

  async processScheduledReports() {
    const activeSchedules = await this.prisma.scheduledReport.findMany({
      where: { isActive: true },
      include: { savedReport: true }});

    for (const schedule of activeSchedules) {
      this.logger.log(`Executing scheduled report: ${schedule.savedReport.name}`);
      try {
        const data = await this.reportsService.executeReport({
          module: schedule.savedReport.module as any,
          filters: schedule.savedReport.filters as string,
          columns: schedule.savedReport.columns as string,
          format: schedule.format as any});

        let fileBuffer: any;
        switch (schedule.format) {
          case ExportFormat.CSV:
            fileBuffer = await this.exportService.generateCsv(data);
            break;
          case ExportFormat.EXCEL:
            fileBuffer = await this.exportService.generateExcel(data);
            break;
          case ExportFormat.PDF:
            fileBuffer = await this.exportService.generatePdf(data, schedule.savedReport.name);
            break;
          default:
            fileBuffer = JSON.stringify(data);
        }

        // Logic to dispatch emails to schedule.recipients would go here
        const recipients = typeof schedule.recipients === 'string' ? JSON.parse(schedule.recipients) : schedule.recipients;
        this.logger.log(`Would email report to: ${recipients.join(', ')}`);

        // Update lastRunAt
        await this.prisma.scheduledReport.update({
          where: { id: schedule.id },
          data: { lastRunAt: new Date() }});
      } catch (error) {
        this.logger.error(`Failed to execute scheduled report ${schedule.id}`, error);
      }
    }
  }
}
