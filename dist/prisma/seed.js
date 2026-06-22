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
    const superAdminRole = await prisma.role.upsert({
        where: { name: 'Super Admin' },
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
                roles: {
                    create: [
                        {
                            role: { connect: { id: newSuperAdminRole.id } }
                        }
                    ]
                }
            }
        });
    }
    else {
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
//# sourceMappingURL=seed.js.map