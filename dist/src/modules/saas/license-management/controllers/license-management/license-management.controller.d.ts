import { RegisterDeviceDto } from '../../dto/register-device.dto';
import { LicenseManagementService } from '../../services/license-management/license-management.service';
export declare class LicenseManagementController {
    private readonly licenseManagementService;
    constructor(licenseManagementService: LicenseManagementService);
    registerDevice(instituteId: string, req: any, dto: RegisterDeviceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        userId: string;
        deviceIdentifier: string;
        deviceName: string;
        lastActiveAt: Date;
    }>;
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
