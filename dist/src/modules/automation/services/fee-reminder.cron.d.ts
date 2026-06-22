import { PrismaService } from "../../../infrastructure/database/prisma.service";
export declare class FeeReminderCron {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    handleFeeReminders(): Promise<void>;
    processFeeReminders(): Promise<void>;
}
