const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient({
    datasources: { db: { url: 'postgresql://postgres:abhi9072@localhost:5432/erp_master?schema=tenant_globaltech' } }
  });
  const users = await prisma.user.findMany();
  console.log('USERS:', users);
  process.exit(0);
}
main().catch(console.error);
