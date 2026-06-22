const { PrismaClient: PrismaMasterClient } = require('@prisma-master/client');

try {
  const c5 = new PrismaMasterClient({ accelerateUrl: 'postgresql://postgres:abhi9072@localhost:5432/institute_erp_master' });
  console.log('accelerateUrl worked with standard URL');
} catch (e) {
  console.log('accelerateUrl with standard URL failed:', e.message);
}
