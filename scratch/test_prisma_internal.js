const { PrismaClient: PrismaMasterClient } = require('@prisma-master/client');

try {
  const c4 = new PrismaMasterClient({ 
    __internal: { 
      configOverride: { 
        datasources: { db: { url: 'postgresql://postgres:abhi9072@localhost:5432/institute_erp_master' } } 
      } 
    } 
  });
  console.log('__internal configOverride worked');
} catch (e) {
  console.log('__internal configOverride failed:', e.message);
}
