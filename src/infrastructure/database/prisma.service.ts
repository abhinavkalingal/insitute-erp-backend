import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { requestContext } from '../../core/context/request.context';
import { PrismaTenantService } from './prisma-tenant.service';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly tenantService: PrismaTenantService) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgresql://postgres:abhi9072@localhost:5432/institute_erp_tenant' });
    const adapter = new PrismaPg(pool);
    super({ adapter } as any);
    return new Proxy(this, {
      get: (target, prop) => {
        if (typeof prop !== 'string') {
          // If it's a symbol (e.g. Symbol.toStringTag, etc), return it from target
          return target[prop as keyof typeof target];
        }

        const ignoredProps = [
          'onModuleInit', 'onModuleDestroy',
          'onApplicationBootstrap', 'onApplicationShutdown', 'beforeApplicationShutdown',
          'then', 'catch', 'finally',
          'hasOwnProperty', 'toString', 'valueOf', 'constructor',
          'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString'
        ];
        
        if (typeof prop === 'string') {
          if (prop === '$connect' || prop === '$disconnect') {
            return async () => {};
          }
          if (ignoredProps.includes(prop) || prop.startsWith('__')) {
            const val = target[prop as keyof typeof target];
            return typeof val === 'function' ? val.bind(target) : val;
          }
        }

        console.log('Proxy accessed prop:', prop);

        const context = requestContext.getStore();
        if (!context || !context.tenantDbUrl) {
          // If no context, we can't resolve the database.
          // Throwing an error ensures we don't accidentally query a default database.
          throw new InternalServerErrorException('Tenant context is missing or database URL is not set');
        }

        const client = this.tenantService.getClient(context.tenantDbUrl);
        const value = (client as any)[prop];

        if (typeof value === 'function') {
          return value.bind(client);
        }
        return value;
      }});
  }
}
