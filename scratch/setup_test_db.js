const { execSync } = require('child_process');
const { Client } = require('pg');

async function setup() {
  console.log('Setting up PostgreSQL Test Databases...');
  
  // Connect to default postgres DB to create our databases
  const client = new Client({
    connectionString: 'postgresql://postgres:abhi9072@localhost:5432/postgres'
  });
  
  await client.connect();
  
  try {
    // Drop databases if they exist for a clean slate
    await client.query('DROP DATABASE IF EXISTS erp_master');
    await client.query('DROP DATABASE IF EXISTS erp_tenant_demo');
    
    // Create new databases
    console.log('Creating erp_master and erp_tenant_demo databases...');
    await client.query('CREATE DATABASE erp_master');
    await client.query('CREATE DATABASE erp_tenant_demo');
    console.log('Databases created successfully.');
  } catch (error) {
    console.error('Error creating databases:', error.message);
  } finally {
    await client.end();
  }

  // Set environment variables for the schemas
  process.env.MASTER_DATABASE_URL = 'postgresql://postgres:abhi9072@localhost:5432/erp_master';
  process.env.DATABASE_URL = 'postgresql://postgres:abhi9072@localhost:5432/erp_tenant_demo';

  // Push the Master Schema
  console.log('\nPushing schema to Master Database...');
  execSync('npx prisma db push --schema=prisma/master.schema.prisma', { stdio: 'inherit' });

  // Push the Tenant Schema
  console.log('\nPushing schema to Tenant Database...');
  execSync('npx prisma db push --schema=prisma/schema.prisma', { stdio: 'inherit' });

  // Seed the master DB with a demo tenant
  console.log('\nSeeding Master DB with a demo tenant...');
  const { PrismaClient } = require('@prisma-master/client');
  const { Pool } = require('pg');
  const { PrismaPg } = require('@prisma/adapter-pg');

  const pool = new Pool({ connectionString: process.env.MASTER_DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prismaMaster = new PrismaClient({ adapter });

  try {
    // Check if it already exists
    let demoTenant = await prismaMaster.institute.findUnique({ where: { id: 'demo-tenant-1' } });
    if (!demoTenant) {
      demoTenant = await prismaMaster.institute.create({
        data: {
          id: 'demo-tenant-1',
          name: 'Demo Institute of Technology',
          domain: 'demo.institute-erp.com',
          databaseUrl: process.env.DATABASE_URL,
          status: 'ACTIVE',
        }
      });
    }
    console.log('Successfully seeded tenant:', demoTenant.id);
  } catch (err) {
    console.error('Error seeding tenant:', err.message);
  } finally {
    await prismaMaster.$disconnect();
    await pool.end();
  }

  console.log('\n--- Setup Complete ---');
  console.log('You can now test the API by including the header:');
  console.log('x-tenant-id: demo-tenant-1');
}

setup().catch(console.error);
