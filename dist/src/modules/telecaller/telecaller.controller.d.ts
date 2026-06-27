import { TelecallerService } from './telecaller.service';
import { Prisma } from '@prisma/client';
export declare class TelecallerController {
    private readonly telecallerService;
    constructor(telecallerService: TelecallerService);
    createLead(data: Prisma.LeadCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        firstName: string;
        lastName: string | null;
        status: string;
        courseId: string | null;
        phone: string;
        source: string;
        notes: string | null;
        assignedTo: string | null;
    }>;
    getLeads(): Promise<({
        followUps: {
            date: Date;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            notes: string;
            nextFollowUpDate: Date | null;
            leadId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        firstName: string;
        lastName: string | null;
        status: string;
        courseId: string | null;
        phone: string;
        source: string;
        notes: string | null;
        assignedTo: string | null;
    })[]>;
    getLeadById(id: string): Promise<{
        followUps: {
            date: Date;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            notes: string;
            nextFollowUpDate: Date | null;
            leadId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        firstName: string;
        lastName: string | null;
        status: string;
        courseId: string | null;
        phone: string;
        source: string;
        notes: string | null;
        assignedTo: string | null;
    }>;
    updateLeadStatus(id: string, status: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        firstName: string;
        lastName: string | null;
        status: string;
        courseId: string | null;
        phone: string;
        source: string;
        notes: string | null;
        assignedTo: string | null;
    }>;
    addFollowUp(id: string, data: Omit<Prisma.FollowUpCreateInput, 'lead'>): Promise<{
        date: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        notes: string;
        nextFollowUpDate: Date | null;
        leadId: string;
    }>;
    deleteLead(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        firstName: string;
        lastName: string | null;
        status: string;
        courseId: string | null;
        phone: string;
        source: string;
        notes: string | null;
        assignedTo: string | null;
    }>;
    bulkAssignLeads(leadIds: string[], assigneeId: string): Promise<Prisma.BatchPayload>;
}
