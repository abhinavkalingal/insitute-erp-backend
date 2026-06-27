import { DirectorService } from './director.service';
import { Prisma } from '@prisma/client';
export declare class DirectorController {
    private readonly directorService;
    constructor(directorService: DirectorService);
    createApproval(data: Prisma.ApprovalRequestCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        type: string;
        title: string;
        status: string;
        branchId: string | null;
        remarks: string | null;
        amount: number | null;
        requestedBy: string | null;
        approvedBy: string | null;
    }>;
    getApprovals(): Promise<({
        requester: {
            id: string;
            firstName: string;
            lastName: string | null;
        } | null;
        approver: {
            id: string;
            firstName: string;
            lastName: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        type: string;
        title: string;
        status: string;
        branchId: string | null;
        remarks: string | null;
        amount: number | null;
        requestedBy: string | null;
        approvedBy: string | null;
    })[]>;
    updateApproval(id: string, data: Prisma.ApprovalRequestUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        type: string;
        title: string;
        status: string;
        branchId: string | null;
        remarks: string | null;
        amount: number | null;
        requestedBy: string | null;
        approvedBy: string | null;
    }>;
    deleteApproval(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        type: string;
        title: string;
        status: string;
        branchId: string | null;
        remarks: string | null;
        amount: number | null;
        requestedBy: string | null;
        approvedBy: string | null;
    }>;
}
