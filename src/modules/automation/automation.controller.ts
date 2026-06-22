import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { RequirePermissions } from '@core/decorators/permissions.decorator';

import { FeeReminderCron } from './services/fee-reminder.cron';
import { CertificateGenerationCron } from './services/certificate-generation.cron';
import { ReportSchedulerCron } from './services/report-scheduler.cron';
import { GeneralReminderCron } from './services/general-reminder.cron';

@ApiTags('Automation (System Admin)')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('automation')
export class AutomationController {
  constructor(
    private readonly feeReminderCron: FeeReminderCron,
    private readonly certificateGenerationCron: CertificateGenerationCron,
    private readonly reportSchedulerCron: ReportSchedulerCron,
    private readonly generalReminderCron: GeneralReminderCron,
  ) {}

  @Post('trigger/fee-reminders')
  @RequirePermissions('manage:automation')
  @ApiOperation({ summary: 'Manually trigger fee reminders' })
  async triggerFeeReminders() {
    await this.feeReminderCron.processFeeReminders();
    return { message: 'Fee reminders triggered successfully.' };
  }

  @Post('trigger/certificates')
  @RequirePermissions('manage:automation')
  @ApiOperation({ summary: 'Manually trigger auto-certificate generation' })
  async triggerCertificates() {
    await this.certificateGenerationCron.processCertificates();
    return { message: 'Certificate generation triggered successfully.' };
  }

  @Post('trigger/reports')
  @RequirePermissions('manage:automation')
  @ApiOperation({ summary: 'Manually trigger scheduled reports' })
  async triggerReports() {
    await this.reportSchedulerCron.processScheduledReports();
    return { message: 'Scheduled reports triggered successfully.' };
  }

  @Post('trigger/general-reminders')
  @RequirePermissions('manage:automation')
  @ApiOperation({ summary: 'Manually trigger general event/assignment reminders' })
  async triggerGeneralReminders() {
    await this.generalReminderCron.processUpcomingEvents();
    await this.generalReminderCron.processUpcomingAssignments();
    return { message: 'General reminders triggered successfully.' };
  }
}
