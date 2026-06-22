const { PrismaClient: PrismaMasterClient } = require('@prisma-master/client');

async function test() {
  try {
    const c5 = new PrismaMasterClient({ accelerateUrl: 'postgresql://postgres:abhi9072@localhost:5432/institute_erp_master' });
    console.log('accelerateUrl instantiated');
    await c5.$connect();
    console.log('accelerateUrl connected');
  } catch (e) {
    console.log('accelerateUrl connect failed:', e.message);
  }
}
test();
