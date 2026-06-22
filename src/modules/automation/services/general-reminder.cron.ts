import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '@infrastructure/database/prisma.service';

@Injectable()
export class GeneralReminderCron {
  private readonly logger = new Logger(GeneralReminderCron.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async handleGeneralReminders() {
    this.logger.debug('Running general reminders check...');
    await this.processUpcomingEvents();
    await this.processUpcomingAssignments();
  }

  async processUpcomingEvents() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));

    const upcomingEvents = await this.prisma.event.findMany({
      where: {
        startDate: {
          gte: startOfTomorrow,
          lte: endOfTomorrow}},
      include: {
        participants: {
          include: { student: { include: { user: true } }, staff: { include: { user: true } } }}}});

    for (const event of upcomingEvents) {
      this.logger.log(`Reminder: Event '${event.title}' is happening tomorrow!`);
      // Notify participants...
    }
  }

  async processUpcomingAssignments() {
    const inTwoDays = new Date();
    inTwoDays.setDate(inTwoDays.getDate() + 2);

    const startOfDay = new Date(inTwoDays.setHours(0, 0, 0, 0));
    const endOfDay = new Date(inTwoDays.setHours(23, 59, 59, 999));

    const upcomingAssignments = await this.prisma.assignment.findMany({
      where: {
        dueDate: {
          gte: startOfDay,
          lte: endOfDay}},
      include: {
        course: {
          include: { students: { include: { user: true } } }}}});

    for (const assignment of upcomingAssignments) {
      this.logger.log(`Reminder: Assignment '${assignment.title}' is due in 2 days!`);
      // Notify enrolled students...
    }
  }
}
