import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { ReportsModule } from '@modules/reports/reports.module';

import { AutomationController } from './automation.controller';
import { FeeReminderCron } from './services/fee-reminder.cron';
import { CertificateGenerationCron } from './services/certificate-generation.cron';
import { ReportSchedulerCron } from './services/report-scheduler.cron';
import { GeneralReminderCron } from './services/general-reminder.cron';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
    ReportsModule,
  ],
  controllers: [AutomationController],
  providers: [
    FeeReminderCron,
    CertificateGenerationCron,
    ReportSchedulerCron,
    GeneralReminderCron,
  ]})
export class AutomationModule {}
