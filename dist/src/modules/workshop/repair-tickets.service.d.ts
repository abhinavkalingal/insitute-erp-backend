import { PrismaService } from "../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
export declare class RepairTicketsService {
    private prisma;
    constructor(prisma: PrismaService);
    createTicket(data: Prisma.RepairTicketCreateInput): Promise<{
        logs: {
            id: string;
            createdAt: Date;
            notes: string | null;
            statusUpdate: string;
            createdBy: string;
            ticketId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        customerName: string;
        customerPhone: string;
        deviceModel: string;
        imeiOrSerial: string | null;
        problemDescription: string;
        assignedStudentId: string | null;
        assignedStaffId: string | null;
        estimatedCost: number | null;
        finalCost: number | null;
    }>;
    getTickets(): Promise<({
        logs: {
            id: string;
            createdAt: Date;
            notes: string | null;
            statusUpdate: string;
            createdBy: string;
            ticketId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        customerName: string;
        customerPhone: string;
        deviceModel: string;
        imeiOrSerial: string | null;
        problemDescription: string;
        assignedStudentId: string | null;
        assignedStaffId: string | null;
        estimatedCost: number | null;
        finalCost: number | null;
    })[]>;
    getTicketById(id: string): Promise<{
        logs: {
            id: string;
            createdAt: Date;
            notes: string | null;
            statusUpdate: string;
            createdBy: string;
            ticketId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        customerName: string;
        customerPhone: string;
        deviceModel: string;
        imeiOrSerial: string | null;
        problemDescription: string;
        assignedStudentId: string | null;
        assignedStaffId: string | null;
        estimatedCost: number | null;
        finalCost: number | null;
    }>;
    updateTicketStatus(id: string, status: string, notes: string, userId: string): Promise<{
        logs: {
            id: string;
            createdAt: Date;
            notes: string | null;
            statusUpdate: string;
            createdBy: string;
            ticketId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        customerName: string;
        customerPhone: string;
        deviceModel: string;
        imeiOrSerial: string | null;
        problemDescription: string;
        assignedStudentId: string | null;
        assignedStaffId: string | null;
        estimatedCost: number | null;
        finalCost: number | null;
    }>;
    updateTicket(id: string, data: Prisma.RepairTicketUpdateInput): Promise<{
        logs: {
            id: string;
            createdAt: Date;
            notes: string | null;
            statusUpdate: string;
            createdBy: string;
            ticketId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        customerName: string;
        customerPhone: string;
        deviceModel: string;
        imeiOrSerial: string | null;
        problemDescription: string;
        assignedStudentId: string | null;
        assignedStaffId: string | null;
        estimatedCost: number | null;
        finalCost: number | null;
    }>;
    deleteTicket(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        customerName: string;
        customerPhone: string;
        deviceModel: string;
        imeiOrSerial: string | null;
        problemDescription: string;
        assignedStudentId: string | null;
        assignedStaffId: string | null;
        estimatedCost: number | null;
        finalCost: number | null;
    }>;
}
