const { PrismaClient: PrismaMasterClient } = require('@prisma-master/client');

try {
  const c1 = new PrismaMasterClient({ datasourceUrl: 'postgresql://postgres:abhi9072@localhost:5432/institute_erp_master' });
  console.log('datasourceUrl worked');
} catch (e) {
  console.log('datasourceUrl failed:', e.message);
}

try {
  const c2 = new PrismaMasterClient({ datasources: { db: { url: 'postgresql://postgres:abhi9072@localhost:5432/institute_erp_master' } } });
  console.log('datasources worked');
} catch (e) {
  console.log('datasources failed:', e.message);
}

try {
  const c3 = new PrismaMasterClient({ url: 'postgresql://postgres:abhi9072@localhost:5432/institute_erp_master' });
  console.log('url worked');
} catch (e) {
  console.log('url failed:', e.message);
}
