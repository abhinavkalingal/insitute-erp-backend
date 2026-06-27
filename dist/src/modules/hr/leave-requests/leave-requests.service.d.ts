import { PrismaService } from "../../../infrastructure/database/prisma.service";
export declare class LeaveRequestsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        staff: {
            user: {
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                email: string;
                passwordHash: string;
                firstName: string;
                lastName: string | null;
                isEmailVerified: boolean;
                resetPasswordToken: string | null;
                resetPasswordExpires: Date | null;
                emailVerificationToken: string | null;
            };
        } & {
            id: string;
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            branchId: string | null;
            employeeId: string | null;
            department: string | null;
            designation: string | null;
            joiningDate: Date | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        startDate: Date;
        endDate: Date;
        status: string;
        reason: string;
        staffId: string;
    })[]>;
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        startDate: Date;
        endDate: Date;
        status: string;
        reason: string;
        staffId: string;
    }>;
    updateStatus(id: string, status: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        startDate: Date;
        endDate: Date;
        status: string;
        reason: string;
        staffId: string;
    }>;
}
