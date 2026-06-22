import { OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaTenantService implements OnModuleDestroy {
    private readonly clients;
    getClient(databaseUrl?: string): PrismaClient;
    onModuleDestroy(): Promise<void>;
}
