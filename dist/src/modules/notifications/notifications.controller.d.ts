import type { Request } from 'express';
import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(req: Request, unreadOnly?: string): import("@prisma/client").Prisma.PrismaPromise<{
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
    markAsRead(id: string, req: Request): Promise<{
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
    markAllAsRead(req: Request): Promise<{
        message: string;
    }>;
}
