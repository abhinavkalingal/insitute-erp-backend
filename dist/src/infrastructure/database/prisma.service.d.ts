import { PrismaClient } from '@prisma/client';
import { PrismaTenantService } from './prisma-tenant.service';
export declare class PrismaService extends PrismaClient {
    private readonly tenantService;
    constructor(tenantService: PrismaTenantService);
}
