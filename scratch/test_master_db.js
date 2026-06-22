require('dotenv').config();
const { PrismaClient } = require('@prisma-master/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: process.env.MASTER_DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function test() {
  try {
    const institute = await prisma.institute.findUnique({
      where: { id: 'demo-tenant-1' }
    });
    console.log('Institute found:', institute);
  } catch(e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}
test();
