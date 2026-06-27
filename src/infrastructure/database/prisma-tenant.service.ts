import { Injectable, Scope, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { requestContext } from '../../core/context/request.context';

@Injectable({ scope: Scope.TRANSIENT })
export class PrismaTenantService implements OnModuleDestroy {
  private readonly clients = new Map<string, PrismaClient>();

  public getClient(databaseUrl?: string): PrismaClient {
    if (!databaseUrl) {
      throw new Error('Database URL must be provided to tenant service');
    }

    if (this.clients.has(databaseUrl)) {
      return this.clients.get(databaseUrl)!;
    }

    const urlObj = new URL(databaseUrl);
    const schema = urlObj.searchParams.get('schema') || 'public';
    
    // Pass the raw connection string without modifying search_path
    const poolConfig: any = { connectionString: databaseUrl };
    
    const pool = new Pool(poolConfig);
    const adapter = new PrismaPg(pool, { schema });
    const client = new PrismaClient({ adapter } as any);

    // Register Prisma Client Extensions for Audit Logging
    const extendedClient = client.$extends({
      query: {
        $allModels: {
          async $allOperations({ model, operation, args, query }: any) {
            const result = await query(args);
            const actionsToLog = ['create', 'update', 'delete'];

            if (actionsToLog.includes(operation) && model !== 'AuditLog') {
              const entityId = result?.id;
              if (entityId) {
                // Log asynchronously using the same client
                const context = requestContext.getStore();
                // Notice we cast extendedClient to any to avoid TS circular inference issues
                (extendedClient as any).auditLog.create({
                  data: {
                    userId: context?.userId || null,
                    action: operation.toUpperCase(),
                    entity: model as string,
                    entityId,
                    changes: args?.data ? JSON.parse(JSON.stringify(args.data)) : null,
                    ipAddress: context?.ipAddress || null,
                    userAgent: context?.userAgent || null
                  }
                }).catch(console.error);
              }
            }
            return result;
          }
        }
      }
    });

    this.clients.set(databaseUrl, extendedClient as any);
    return extendedClient as any;
  }

  async onModuleDestroy() {
    const disconnectPromises = Array.from(this.clients.values()).map(client =>
      client.$disconnect()
    );
    await Promise.all(disconnectPromises);
    this.clients.clear();
  }
}
