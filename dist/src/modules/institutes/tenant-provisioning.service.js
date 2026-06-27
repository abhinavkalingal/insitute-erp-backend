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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TenantProvisioningService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantProvisioningService = void 0;
const common_1 = require("@nestjs/common");
const prisma_tenant_service_1 = require("../../infrastructure/database/prisma-tenant.service");
const child_process_1 = require("child_process");
const util = __importStar(require("util"));
const bcrypt = __importStar(require("bcrypt"));
const execAsync = util.promisify(child_process_1.exec);
let TenantProvisioningService = TenantProvisioningService_1 = class TenantProvisioningService {
    prismaTenant;
    logger = new common_1.Logger(TenantProvisioningService_1.name);
    constructor(prismaTenant) {
        this.prismaTenant = prismaTenant;
    }
    async provisionTenant(databaseUrl, adminEmail, adminFirstName, adminLastName) {
        this.logger.log(`Starting provisioning for tenant DB: ${databaseUrl}`);
        try {
            this.logger.log('Pushing Prisma schema to new tenant database...');
            const { stdout, stderr } = await execAsync(`npx prisma db push --schema=prisma/schema.prisma --url="${databaseUrl}" --accept-data-loss`);
            this.logger.log(`Prisma Push Output: ${stdout}`);
            if (stderr) {
                this.logger.warn(`Prisma Push Stderr: ${stderr}`);
            }
            this.logger.log('Connecting to tenant database for seeding...');
            const tenantPrisma = this.prismaTenant.getClient(databaseUrl);
            this.logger.log('Seeding permissions...');
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
            ];
            for (const perm of permissionsData) {
                await tenantPrisma.permission.upsert({
                    where: { action: perm.action },
                    update: {},
                    create: perm,
                });
            }
            const allPermissions = await tenantPrisma.permission.findMany();
            this.logger.log('Creating Institute Admin role...');
            await tenantPrisma.role.deleteMany({ where: { name: 'Institute Admin' } });
            const adminRole = await tenantPrisma.role.create({
                data: {
                    name: 'Institute Admin',
                    description: 'Tenant Administrator with full access to this institute.',
                    permissions: {
                        create: allPermissions.map(p => ({
                            permission: { connect: { id: p.id } }
                        }))
                    }
                }
            });
            this.logger.log(`Creating Admin user: ${adminEmail}`);
            const passwordHash = await bcrypt.hash('Welcome123!', 10);
            let adminUser = await tenantPrisma.user.findUnique({ where: { email: adminEmail } });
            if (!adminUser) {
                adminUser = await tenantPrisma.user.create({
                    data: {
                        email: adminEmail,
                        firstName: adminFirstName,
                        lastName: adminLastName,
                        passwordHash,
                        isEmailVerified: true,
                        roles: {
                            create: [
                                {
                                    role: { connect: { id: adminRole.id } }
                                }
                            ]
                        }
                    }
                });
            }
            else {
                await tenantPrisma.userRole.upsert({
                    where: { userId_roleId: { userId: adminUser.id, roleId: adminRole.id } },
                    update: {},
                    create: {
                        userId: adminUser.id,
                        roleId: adminRole.id
                    }
                });
            }
            this.logger.log(`Tenant provisioning successful for ${databaseUrl}`);
            return true;
        }
        catch (error) {
            this.logger.error(`Error provisioning tenant: ${error}`);
            return false;
        }
    }
};
exports.TenantProvisioningService = TenantProvisioningService;
exports.TenantProvisioningService = TenantProvisioningService = TenantProvisioningService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_tenant_service_1.PrismaTenantService])
], TenantProvisioningService);
//# sourceMappingURL=tenant-provisioning.service.js.map