import { PrismaTenantService } from "../../infrastructure/database/prisma-tenant.service";
export declare class TenantProvisioningService {
    private readonly prismaTenant;
    private readonly logger;
    constructor(prismaTenant: PrismaTenantService);
    provisionTenant(databaseUrl: string, adminEmail: string, adminFirstName: string, adminLastName: string, instituteName?: string): Promise<string | false>;
}
