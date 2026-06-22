import { PrismaMasterService } from "../../infrastructure/database/prisma-master.service";
export declare class SaasEnforcementService {
    private readonly prisma;
    constructor(prisma: PrismaMasterService);
    checkLimit(instituteId: string, featureKey: string, currentUsage: number, amountToAdd?: number): Promise<void>;
    checkFeatureAccess(instituteId: string, featureKey: string): Promise<void>;
}
