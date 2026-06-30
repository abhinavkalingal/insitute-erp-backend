import { PrismaService } from "../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
export declare class OperationsService {
    private prisma;
    constructor(prisma: PrismaService);
    createTicket(data: Prisma.SupportTicketCreateInput): Promise<{
        subject: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        branchId: string | null;
        category: string;
        priority: string;
        resolution: string | null;
        raisedById: string | null;
        assignedToId: string | null;
    }>;
    getTickets(): Promise<({
        assignedTo: {
            id: string;
            firstName: string;
            lastName: string | null;
        } | null;
        raisedBy: {
            id: string;
            firstName: string;
            lastName: string | null;
        } | null;
    } & {
        subject: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        branchId: string | null;
        category: string;
        priority: string;
        resolution: string | null;
        raisedById: string | null;
        assignedToId: string | null;
    })[]>;
    updateTicket(id: string, data: Prisma.SupportTicketUpdateInput): Promise<{
        subject: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        branchId: string | null;
        category: string;
        priority: string;
        resolution: string | null;
        raisedById: string | null;
        assignedToId: string | null;
    }>;
    deleteTicket(id: string): Promise<{
        subject: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        branchId: string | null;
        category: string;
        priority: string;
        resolution: string | null;
        raisedById: string | null;
        assignedToId: string | null;
    }>;
}
