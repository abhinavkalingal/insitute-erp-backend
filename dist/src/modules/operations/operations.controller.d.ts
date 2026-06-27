import { OperationsService } from './operations.service';
import { Prisma } from '@prisma/client';
export declare class OperationsController {
    private readonly operationsService;
    constructor(operationsService: OperationsService);
    createTicket(data: Prisma.SupportTicketCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        subject: string;
        description: string | null;
        status: string;
        priority: string;
        branchId: string | null;
        category: string;
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        subject: string;
        description: string | null;
        status: string;
        priority: string;
        branchId: string | null;
        category: string;
        resolution: string | null;
        raisedById: string | null;
        assignedToId: string | null;
    })[]>;
    updateTicket(id: string, data: Prisma.SupportTicketUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        subject: string;
        description: string | null;
        status: string;
        priority: string;
        branchId: string | null;
        category: string;
        resolution: string | null;
        raisedById: string | null;
        assignedToId: string | null;
    }>;
    deleteTicket(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        subject: string;
        description: string | null;
        status: string;
        priority: string;
        branchId: string | null;
        category: string;
        resolution: string | null;
        raisedById: string | null;
        assignedToId: string | null;
    }>;
}
