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
    // Global & Auth
    { action: 'manage:all', description: 'Full access to everything' },
    { action: 'manage:users', description: 'Manage all users' },
    { action: 'manage:roles', description: 'Manage roles and permissions' },
    { action: 'manage:branches', description: 'Manage branches' },
    
    // Academics
    { action: 'manage:academics', description: 'Manage courses, batches, subjects' },
    { action: 'read:academics', description: 'Read academic structure' },
    
    // Students & Staff
    { action: 'manage:students', description: 'Manage students' },
    { action: 'read:students', description: 'Read students' },
    { action: 'manage:staff', description: 'Manage staff' },
    { action: 'read:staff', description: 'Read staff' },
    
    // Finance
    { action: 'manage:finance', description: 'Manage fees, invoices, expenses' },
    { action: 'read:finance', description: 'View financial records' },
    
    // Reception
    { action: 'manage:reception', description: 'Manage front desk, visitors, ID cards' },
    { action: 'read:reception', description: 'View front desk records' },
    
    // Telecaller/CRM
    { action: 'manage:leads', description: 'Manage leads and telecalling' },
    
    // Placement
    { action: 'manage:placements', description: 'Manage placement drives and companies' },
    
    // Attendance
    { action: 'manage:attendance', description: 'Mark and manage attendance' },
    { action: 'read:attendance', description: 'View attendance records' },
  ];

  for (const perm of permissionsData) {
    await prisma.permission.upsert({
      where: { action: perm.action },
      update: {},
      create: perm,
    });
  }
  const allPermissions = await prisma.permission.findMany();
  const permMap = Object.fromEntries(allPermissions.map(p => [p.action, p.id]));

  // 2. Default System Roles
  const rolesData = [
    {
      name: 'Super Admin',
      description: 'System Administrator with full access.',
      perms: ['manage:all']
    },
    {
      name: 'Branch Admin',
      description: 'Administrator for a specific branch.',
      perms: ['manage:users', 'manage:academics', 'manage:students', 'manage:staff', 'manage:finance', 'manage:reception', 'manage:leads', 'manage:placements', 'manage:attendance']
    },
    {
      name: 'Teacher',
      description: 'Academic staff member.',
      perms: ['read:academics', 'read:students', 'manage:attendance']
    },
    {
      name: 'Accountant',
      description: 'Finance and payroll manager.',
      perms: ['manage:finance', 'read:students', 'read:staff']
    },
    {
      name: 'Receptionist',
      description: 'Front desk operator.',
      perms: ['manage:reception', 'read:students', 'read:staff', 'manage:leads']
    },
    {
      name: 'Student',
      description: 'Enrolled student.',
      perms: ['read:academics', 'read:attendance']
    },
    {
      name: 'Parent',
      description: 'Guardian of a student.',
      perms: ['read:academics', 'read:attendance', 'read:finance']
    }
  ];

  for (const roleDef of rolesData) {
    // Delete if exists to recreate clean mappings
    await prisma.role.deleteMany({ where: { name: roleDef.name } });
    
    const rolePerms = roleDef.perms.includes('manage:all')
      ? allPermissions.map(p => ({ permission: { connect: { id: p.id } } }))
      : roleDef.perms.map(action => ({ permission: { connect: { id: permMap[action] } } }));

    await prisma.role.create({
      data: {
        name: roleDef.name,
        description: roleDef.description,
        permissions: {
          create: rolePerms
        }
      }
    });
  }

  const superAdminRole = await prisma.role.findUnique({ where: { name: 'Super Admin' } });

  // 3. Default Structural Data (Branch & Academic Year)
  let defaultBranch = await prisma.branch.findFirst({ where: { name: 'Main Campus' } });
  if (!defaultBranch) {
    defaultBranch = await prisma.branch.create({
      data: {
        name: 'Main Campus',
        address: { city: 'Default City', country: 'Default Country' },
        isActive: true,
      }
    });
    console.log(`Created default branch: ${defaultBranch.name}`);
  }

  let defaultYear = await prisma.academicYear.findFirst({ where: { name: '2026-2027' } });
  if (!defaultYear) {
    defaultYear = await prisma.academicYear.create({
      data: {
        name: '2026-2027',
        startDate: new Date('2026-06-01T00:00:00Z'),
        endDate: new Date('2027-05-31T23:59:59Z'),
        isActive: true,
      }
    });
    console.log(`Created default academic year: ${defaultYear.name}`);
  }

  // 4. Default Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  
  let adminUser = await prisma.user.findUnique({ where: { email: 'admin@institute.com' } });
  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        email: 'admin@institute.com',
        firstName: 'System',
        lastName: 'Admin',
        passwordHash,
        isActive: true,
        isEmailVerified: true,
        roles: {
          create: [
            {
              role: { connect: { id: superAdminRole!.id } }
            }
          ]
        }
      }
    });
  } else {
    // Ensure they have the role
    const hasRole = await prisma.userRole.findFirst({
      where: { userId: adminUser.id, roleId: superAdminRole!.id }
    });
    if (!hasRole) {
      await prisma.userRole.create({
        data: {
          userId: adminUser.id,
          roleId: superAdminRole!.id
        }
      });
    }
  }

  console.log('DB seed complete!');
  console.log('Tenant Admin User: admin@institute.com / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
