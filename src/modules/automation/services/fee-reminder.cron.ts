import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '@infrastructure/database/prisma.service';

@Injectable()
export class FeeReminderCron {
  private readonly logger = new Logger(FeeReminderCron.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async handleFeeReminders() {
    this.logger.debug('Running daily fee reminder check...');
    await this.processFeeReminders();
  }

  async processFeeReminders() {
    const today = new Date();
    // Invoices that are DUE and unpaid
    const overdueInvoices = await this.prisma.invoice.findMany({
      where: {
        status: { in: ['PENDING', 'PARTIAL'] },
        dueDate: { lt: today }},
      include: {
        student: { include: { user: true } },
        }});

    for (const invoice of overdueInvoices) {
      this.logger.log(`Sending reminder to ${invoice.student?.user?.email} for invoice ${invoice.invoiceNumber}`);
      
      // In a real system, you would integrate with MailService or NotificationService here
      // await this.mailService.sendInvoiceReminder(invoice.student?.user?.email, invoice);
    }
  }
}
