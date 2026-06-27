import { Injectable, Logger } from '@nestjs/common';
import { PrismaTenantService } from '@infrastructure/database/prisma-tenant.service';
import { exec } from 'child_process';
import * as util from 'util';
import * as bcrypt from 'bcrypt';

const execAsync = util.promisify(exec);

@Injectable()
export class TenantProvisioningService {
  private readonly logger = new Logger(TenantProvisioningService.name);

  constructor(private readonly prismaTenant: PrismaTenantService) {}

  async provisionTenant(databaseUrl: string, adminEmail: string, adminFirstName: string, adminLastName: string): Promise<boolean> {
    this.logger.log(`Starting provisioning for tenant DB: ${databaseUrl}`);

    try {
      // 1. Run Prisma DB Push to create schemas/tables
      this.logger.log('Pushing Prisma schema to new tenant database...');
      // Using npx prisma db push with --url override
      const { stdout, stderr } = await execAsync(`npx prisma db push --schema=prisma/schema.prisma --url="${databaseUrl}" --accept-data-loss`);
      this.logger.log(`Prisma Push Output: ${stdout}`);
      if (stderr) {
        this.logger.warn(`Prisma Push Stderr: ${stderr}`);
      }

      // 2. Connect to the new database directly to seed data
      this.logger.log('Connecting to tenant database for seeding...');
      const tenantPrisma = this.prismaTenant.getClient(databaseUrl);

      // 3. Seed Permissions
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
        // other basic software permissions would be added here
      ];

      for (const perm of permissionsData) {
        await tenantPrisma.permission.upsert({
          where: { action: perm.action },
          update: {},
          create: perm,
        });
      }
      const allPermissions = await tenantPrisma.permission.findMany();

      // 4. Create Institute Admin Role
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

      // 5. Create Tenant Admin User
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
      } else {
        await tenantPrisma.userRole.upsert({
          where: { userId_roleId: { userId: adminUser.id, roleId: adminRole.id } },
          update: {},
          create: {
            userId: adminUser.id,
            roleId: adminRole.id
          }
        });
      }

      // No need to disconnect manually as it's pooled by PrismaTenantService
      this.logger.log(`Tenant provisioning successful for ${databaseUrl}`);
      return true;

    } catch (error) {
      this.logger.error(`Error provisioning tenant: ${error}`);
      return false;
    }
  }
}
