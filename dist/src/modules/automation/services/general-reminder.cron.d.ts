import { PrismaService } from "../../../infrastructure/database/prisma.service";
export declare class GeneralReminderCron {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    handleGeneralReminders(): Promise<void>;
    processUpcomingEvents(): Promise<void>;
    processUpcomingAssignments(): Promise<void>;
}
