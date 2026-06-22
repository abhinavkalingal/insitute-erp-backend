const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcrypt');

async function seedUser() {
  const connectionString = 'postgresql://postgres:abhi9072@localhost:5432/institute_erp_tenant';
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log('Seeding user to tenant database...');
  try {
    const passwordHash = await bcrypt.hash('password123', 10);
    
    // Create super admin role if doesn't exist
    const role = await prisma.role.upsert({
      where: { name: 'Super Admin' },
      update: {},
      create: { name: 'Super Admin', description: 'System Administrator' }
    });

    // Create user
    const user = await prisma.user.upsert({
      where: { email: 'admin@demo.com' },
      update: { passwordHash, isActive: true },
      create: {
        id: 'user-1',
        email: 'admin@demo.com',
        firstName: 'System',
        lastName: 'Admin',
        passwordHash,
        isActive: true,
      }
    });

    console.log('User seeded successfully:');
    console.log('Email:', user.email);
    console.log('Password: password123');
  } catch (error) {
    console.error('Error seeding user:', error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

seedUser();
