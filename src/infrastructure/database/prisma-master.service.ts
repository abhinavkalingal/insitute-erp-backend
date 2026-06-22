import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma-master/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaMasterService extends PrismaClient {
  constructor() {
    const pool = new Pool({ connectionString: process.env.MASTER_DATABASE_URL });
    const adapter = new PrismaPg(pool);
    super({ adapter } as any);
  }
}
