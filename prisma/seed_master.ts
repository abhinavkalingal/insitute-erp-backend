import { Client } from 'pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

async function main() {
  console.log('Seeding Master DB...');
  const connectionString = process.env.MASTER_DATABASE_URL || 'postgresql://postgres:abhi9072@localhost:5432/erp_master';
  const client = new Client({ connectionString });
  await client.connect();

  const email = 'admin@institute.com';
  const passwordHash = await bcrypt.hash('admin123', 10);
  const firstName = 'System';
  const lastName = 'Admin';

  // Check if super admin table exists and if the user is already registered
  try {
    const res = await client.query('SELECT * FROM "SuperAdmin" WHERE email = $1', [email]);
    if (res.rows.length === 0) {
      const uuid = '7b8b209e-7119-482a-bc91-382902377ee1';
      await client.query(
        'INSERT INTO "SuperAdmin" (id, email, "passwordHash", "firstName", "lastName", "isActive", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())',
        [uuid, email, passwordHash, firstName, lastName, true]
      );
      console.log('Super Admin user created successfully in Master DB!');
    } else {
      console.log('Super Admin user already exists in Master DB.');
    }
  } catch (err) {
    console.error('Error seeding Master DB:', err);
  } finally {
    await client.end();
  }
}

main().catch(console.error);
