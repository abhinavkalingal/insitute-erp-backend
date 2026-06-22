import { SaasEnforcementService } from "../../../../../core/services/saas-enforcement.service";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { RegisterDeviceDto } from '../../dto/register-device.dto';
export declare class LicenseManagementService {
    private readonly prisma;
    private readonly saasEnforcement;
    constructor(prisma: PrismaService, saasEnforcement: SaasEnforcementService);
    registerDevice(instituteId: string, userId: string, dto: RegisterDeviceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        userId: string;
        deviceIdentifier: string;
        deviceName: string;
        lastActiveAt: Date;
    }>;
    private verifyLicenseLimit;
    listDevices(targetUserId?: string): Promise<({
        user: {
            email: string;
            firstName: string;
            lastName: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        userId: string;
        deviceIdentifier: string;
        deviceName: string;
        lastActiveAt: Date;
    })[]>;
    revokeDevice(id: string): Promise<{
        message: string;
    }>;
}
