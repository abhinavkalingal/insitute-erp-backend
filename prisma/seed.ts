import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log('Starting DB seed...');

  // 1. Setup Permissions
  const permissionsData = [
    { action: 'create:users', description: 'Create users' },
    { action: 'read:users', description: 'Read users' },
    { action: 'update:users', description: 'Update users' },
    { action: 'delete:users', description: 'Delete users' },
    { action: 'create:roles', description: 'Create roles' },
    { action: 'read:roles', description: 'Read roles' },
    { action: 'update:roles', description: 'Update roles' },
    { action: 'delete:roles', description: 'Delete roles' },
    { action: 'assign:roles', description: 'Assign roles to users' },
    { action: 'create:permissions', description: 'Create permissions' },
    { action: 'read:permissions', description: 'Read permissions' },
    { action: 'delete:permissions', description: 'Delete permissions' },
    { action: 'create:institutes', description: 'Create institutes' },
    { action: 'read:institutes', description: 'Read institutes' },
    { action: 'update:institutes', description: 'Update institutes' },
    { action: 'delete:institutes', description: 'Delete institutes' },
    { action: 'create:branches', description: 'Create branches' },
    { action: 'read:branches', description: 'Read branches' },
    { action: 'update:branches', description: 'Update branches' },
    { action: 'delete:branches', description: 'Delete branches' },
    { action: 'read:audit-logs', description: 'Read audit logs' },
  ];

  for (const perm of permissionsData) {
    await prisma.permission.upsert({
      where: { action: perm.action },
      update: {},
      create: perm,
    });
  }
  const allPermissions = await prisma.permission.findMany();

  // 2. Default System Roles (Super Admin)
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'Super Admin' },
    // Let's use findFirst instead for nullable constraints
    update: {},
    create: {
      name: 'Super Admin',
      description: 'System Administrator with full access to everything across all tenants.',
      permissions: {
        create: allPermissions.map(p => ({
          permission: { connect: { id: p.id } }
        }))
      }
    }
  });

  // Since Prisma unique constraint with null is tricky in upsert, let's write custom logic for roles if needed.
  // Above create might fail if it already exists, so let's handle it manually if we run this twice.
  // Actually, I'll delete existing Super Admin role and recreate to ensure all perms are mapped.
  await prisma.role.deleteMany({ where: { name: 'Super Admin' } });
  
  const newSuperAdminRole = await prisma.role.create({
    data: {
      name: 'Super Admin',
      description: 'System Administrator with full access to everything across all tenants.',
      permissions: {
        create: allPermissions.map(p => ({
          permission: { connect: { id: p.id } }
        }))
      }
    }
  });

  // Note: Institute and Branch seeding is removed for now because it spans Master and Tenant databases.
  // In a real setup, we would create the Institute in the Master database, provision the tenant, and then seed the tenant.

  // 5. Default Super Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  
  let adminUser = await prisma.user.findUnique({ where: { email: 'admin@institute.com' } });
  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        email: 'admin@institute.com',
        firstName: 'System',
        lastName: 'Admin',
        passwordHash,
        isEmailVerified: true,
        // No instituteId, meaning they are a cross-tenant super admin
        roles: {
          create: [
            {
              role: { connect: { id: newSuperAdminRole.id } }
            }
          ]
        }
      }
    });
  } else {
    // Ensure they have the role
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: adminUser.id, roleId: newSuperAdminRole.id } },
      update: {},
      create: {
        userId: adminUser.id,
        roleId: newSuperAdminRole.id
      }
    });
  }

  console.log('DB seed complete!');
  console.log('Super Admin User: admin@institute.com / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
