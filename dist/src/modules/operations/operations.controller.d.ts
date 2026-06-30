import { OperationsService } from './operations.service';
import { Prisma } from '@prisma/client';
export declare class OperationsController {
    private readonly operationsService;
    constructor(operationsService: OperationsService);
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
