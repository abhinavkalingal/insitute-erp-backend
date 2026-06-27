import { PrismaService } from "../../infrastructure/database/prisma.service";
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, title: string, message: string, type?: string, link?: string): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: string;
        title: string;
        message: string;
        isRead: boolean;
    }>;
    findAllForUser(userId: string, unreadOnly?: boolean): import("@prisma/client").Prisma.PrismaPromise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: string;
        title: string;
        message: string;
        isRead: boolean;
    }[]>;
    markAsRead(id: string, userId: string): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: string;
        title: string;
        message: string;
        isRead: boolean;
    }>;
    markAllAsRead(userId: string): Promise<{
        message: string;
    }>;
}
