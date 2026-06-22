const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function main() {
  const client = new Client({ connectionString: 'postgresql://postgres:abhi9072@localhost:5432/erp_master' });
  await client.connect();
  try {
    // Seed demo-tenant-1
    await client.query(`
      INSERT INTO "Institute" (id, name, domain, "databaseUrl", "isActive", "updatedAt") 
      VALUES ('demo-tenant-1', 'Demo Institute of Technology', 'demo.institute-erp.com', 'postgresql://postgres:abhi9072@localhost:5432/institute_erp_tenant', true, NOW())
      ON CONFLICT (id) DO NOTHING
    `);
    console.log('Successfully seeded demo-tenant-1 into Master DB');

    // Seed SuperAdmin
    const passwordHash = await bcrypt.hash('admin123', 10);
    await client.query(`
      INSERT INTO "SuperAdmin" (id, email, "passwordHash", "firstName", "lastName", "isActive", "createdAt", "updatedAt")
      VALUES ('super-admin-uuid-1', 'superadmin@erp.com', $1, 'Global', 'Super Admin', true, NOW(), NOW())
      ON CONFLICT (email) DO NOTHING
    `, [passwordHash]);
    console.log('Successfully seeded SuperAdmin (superadmin@erp.com / admin123) into Master DB');
  } catch(e) {
    console.error(e.message);
  } finally {
    await client.end();
  }
}
main();
