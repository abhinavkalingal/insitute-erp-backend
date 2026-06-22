import { FeeReminderCron } from './services/fee-reminder.cron';
import { CertificateGenerationCron } from './services/certificate-generation.cron';
import { ReportSchedulerCron } from './services/report-scheduler.cron';
import { GeneralReminderCron } from './services/general-reminder.cron';
export declare class AutomationController {
    private readonly feeReminderCron;
    private readonly certificateGenerationCron;
    private readonly reportSchedulerCron;
    private readonly generalReminderCron;
    constructor(feeReminderCron: FeeReminderCron, certificateGenerationCron: CertificateGenerationCron, reportSchedulerCron: ReportSchedulerCron, generalReminderCron: GeneralReminderCron);
    triggerFeeReminders(): Promise<{
        message: string;
    }>;
    triggerCertificates(): Promise<{
        message: string;
    }>;
    triggerReports(): Promise<{
        message: string;
    }>;
    triggerGeneralReminders(): Promise<{
        message: string;
    }>;
}
