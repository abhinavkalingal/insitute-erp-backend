"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
require("dotenv/config");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Starting DB seed...');
    const permissionsData = [
        { action: 'manage:all', description: 'Full access to everything' },
        { action: 'manage:users', description: 'Manage all users' },
        { action: 'manage:roles', description: 'Manage roles and permissions' },
        { action: 'manage:branches', description: 'Manage branches' },
        { action: 'manage:academics', description: 'Manage courses, batches, subjects' },
        { action: 'read:academics', description: 'Read academic structure' },
        { action: 'manage:students', description: 'Manage students' },
        { action: 'read:students', description: 'Read students' },
        { action: 'manage:staff', description: 'Manage staff' },
        { action: 'read:staff', description: 'Read staff' },
        { action: 'manage:finance', description: 'Manage fees, invoices, expenses' },
        { action: 'read:finance', description: 'View financial records' },
        { action: 'manage:reception', description: 'Manage front desk, visitors, ID cards' },
        { action: 'read:reception', description: 'View front desk records' },
        { action: 'manage:leads', description: 'Manage leads and telecalling' },
        { action: 'manage:placements', description: 'Manage placement drives and companies' },
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
                            role: { connect: { id: superAdminRole.id } }
                        }
                    ]
                }
            }
        });
    }
    else {
        const hasRole = await prisma.userRole.findFirst({
            where: { userId: adminUser.id, roleId: superAdminRole.id }
        });
        if (!hasRole) {
            await prisma.userRole.create({
                data: {
                    userId: adminUser.id,
                    roleId: superAdminRole.id
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
//# sourceMappingURL=seed.js.map