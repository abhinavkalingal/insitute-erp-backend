import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma-master/client';

import { CreateInstituteDto } from './dto/create-institute.dto';
import { InstituteQueryOptionsDto } from './dto/institute-query-options.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { TenantProvisioningService } from './tenant-provisioning.service';

@Injectable()
export class InstitutesService {
  constructor(
    private readonly prisma: PrismaMasterService,
    private readonly tenantProvisioningService: TenantProvisioningService
  ) {}

  async create(createInstituteDto: CreateInstituteDto) {
    if (createInstituteDto.domain) {
      const existing = await this.prisma.institute.findUnique({
        where: { domain: createInstituteDto.domain }});
      if (existing) {
        throw new ConflictException('Domain already in use by another institute');
      }
    }

    // Cast profile and settings to Prisma.InputJsonValue explicitly to ensure type compatibility
    const { profile, settings, ...rest } = createInstituteDto;

    const institute = await this.prisma.institute.create({
      data: {
        ...rest,
        profile: profile as Prisma.InputJsonValue | undefined,
        settings: settings as Prisma.InputJsonValue | undefined}});

    // Handle initial subscription sync
    if (settings && 'subscriptionPlanId' in settings && settings.subscriptionPlanId) {
      const newPlanId = settings.subscriptionPlanId;
      const plan = await this.prisma.subscriptionPlan.findUnique({ where: { id: newPlanId }});
      if (plan) {
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
        await this.prisma.subscription.create({
          data: {
            instituteId: institute.id,
            planId: newPlanId,
            status: 'ACTIVE',
            billingCycle: 'MONTHLY',
            currentPeriodEnd: endDate,
            cancelAtPeriodEnd: false
          }
        });
      }
    }

    // Trigger tenant provisioning if a databaseUrl and admin email are provided
    if (createInstituteDto.databaseUrl && profile && (profile as any).contactEmail) {
      // Run asynchronously so it doesn't block the API response immediately
      // In production, this should be done via a message queue (e.g. BullMQ)
      const adminEmail = (profile as any).contactEmail;
      const adminFirstName = (profile as any).adminName?.split(' ')[0] || 'Admin';
      const adminLastName = (profile as any).adminName?.split(' ').slice(1).join(' ') || '';
      
      this.tenantProvisioningService.provisionTenant(
        createInstituteDto.databaseUrl, 
        adminEmail, 
        adminFirstName, 
        adminLastName,
        institute.name
      ).then(async targetDbUrl => {
        if (!targetDbUrl) {
          console.error(`Failed to provision tenant DB: ${createInstituteDto.databaseUrl}`);
        } else if (typeof targetDbUrl === 'string' && targetDbUrl !== createInstituteDto.databaseUrl) {
          console.log(`Updating institute record with actual cloud DB URL: ${targetDbUrl.split('@')[1]}`);
          await this.prisma.institute.update({
            where: { id: institute.id },
            data: { databaseUrl: targetDbUrl }
          });
        }
      });
    }

    return institute;
  }

  async findAll(queryOptions: InstituteQueryOptionsDto) {
    const where: Prisma.InstituteWhereInput = {
      deletedAt: null};

    if (queryOptions.isActive !== undefined) {
      where.isActive = queryOptions.isActive === 'true';
    }

    if (queryOptions.search) {
      where.OR = [
        { name: { contains: queryOptions.search, mode: 'insensitive' } },
        { domain: { contains: queryOptions.search, mode: 'insensitive' } },
      ];
    }

    const itemCount = await this.prisma.institute.count({ where });

    const institutes = await this.prisma.institute.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        subscriptions: {
          include: {
            plan: true,
          },
        },
      },
    });

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });

    return new PageDto(institutes, pageMetaDto);
  }

  async findOne(id: string) {
    const institute = await this.prisma.institute.findUnique({
      where: { id }});

    if (!institute || institute.deletedAt) {
      throw new NotFoundException(`Institute with ID ${id} not found`);
    }
    return institute;
  }

  async update(id: string, updateInstituteDto: UpdateInstituteDto) {
    await this.findOne(id); // Ensure exists

    if (updateInstituteDto.domain) {
      const existing = await this.prisma.institute.findUnique({
        where: { domain: updateInstituteDto.domain }});
      if (existing && existing.id !== id) {
        throw new ConflictException('Domain already in use by another institute');
      }
    }

    const { profile, settings, ...rest } = updateInstituteDto;

    // Fetch existing institute to merge JSON objects correctly
    const currentInstitute = await this.prisma.institute.findUnique({ where: { id } });

    const updatedProfile = profile
      ? { ...(currentInstitute?.profile as Record<string, any>), ...profile }
      : undefined;
    const updatedSettings = settings
      ? { ...(currentInstitute?.settings as Record<string, any>), ...settings }
      : undefined;

    const result = await this.prisma.institute.update({
      where: { id },
      data: {
        ...rest,
        ...(profile && { profile: updatedProfile }),
        ...(settings && { settings: updatedSettings })}});

    // Handle subscription sync if subscriptionPlanId was provided
    if (settings && 'subscriptionPlanId' in settings) {
      const newPlanId = settings.subscriptionPlanId;
      console.log(`[InstitutesService] syncing subscription for institute ${id}, newPlanId: ${newPlanId}`);
      if (newPlanId) {
        const existingSub = await this.prisma.subscription.findFirst({ where: { instituteId: id } });
        console.log(`[InstitutesService] existingSub:`, existingSub);
        if (existingSub) {
          if (existingSub.planId !== newPlanId) {
            console.log(`[InstitutesService] updating existing subscription...`);
            await this.prisma.subscription.update({
              where: { id: existingSub.id },
              data: { planId: newPlanId }
            });
            console.log(`[InstitutesService] subscription updated.`);
          }
        } else {
          console.log(`[InstitutesService] checking plan existence...`);
          const plan = await this.prisma.subscriptionPlan.findUnique({ where: { id: newPlanId }});
          console.log(`[InstitutesService] plan found:`, plan?.name);
          if (plan) {
            const endDate = new Date();
            endDate.setMonth(endDate.getMonth() + 1);
            console.log(`[InstitutesService] creating new subscription...`);
            await this.prisma.subscription.create({
              data: {
                instituteId: id,
                planId: newPlanId,
                status: 'ACTIVE',
                billingCycle: 'MONTHLY',
                currentPeriodEnd: endDate,
                cancelAtPeriodEnd: false
              }
            });
            console.log(`[InstitutesService] subscription created successfully.`);
          }
        }
      } else if (newPlanId === null) {
        console.log(`[InstitutesService] removing subscription for institute ${id}`);
        await this.prisma.subscription.deleteMany({ where: { instituteId: id } });
      }
    }

    return result;
  }

  async updateLogo(id: string, logoUrl: string) {
    await this.findOne(id);
    return this.prisma.institute.update({
      where: { id },
      data: { logoUrl }});
  }

  async remove(id: string) {
    await this.findOne(id);

    // Soft delete
    await this.prisma.institute.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false }});

    return { message: 'Institute soft-deleted successfully' };
  }
}
