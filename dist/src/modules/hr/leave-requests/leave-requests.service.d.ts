import { PrismaService } from "../../../infrastructure/database/prisma.service";
export declare class LeaveRequestsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        staff: {
            user: {
                id: string;
                email: string;
                passwordHash: string;
                firstName: string;
                lastName: string | null;
                isActive: boolean;
                isEmailVerified: boolean;
                resetPasswordToken: string | null;
                resetPasswordExpires: Date | null;
                emailVerificationToken: string | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            branchId: string | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
            employeeId: string | null;
            department: string | null;
            designation: string | null;
            joiningDate: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        status: string;
        reason: string;
        staffId: string;
        startDate: Date;
        endDate: Date;
    })[]>;
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        status: string;
        reason: string;
        staffId: string;
        startDate: Date;
        endDate: Date;
    }>;
    updateStatus(id: string, status: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        status: string;
        reason: string;
        staffId: string;
        startDate: Date;
        endDate: Date;
    }>;
}
