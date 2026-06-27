"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutesService = void 0;
const page_dto_1 = require("../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../core/utils/pagination/page-meta.dto");
const prisma_master_service_1 = require("../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
const tenant_provisioning_service_1 = require("./tenant-provisioning.service");
let InstitutesService = class InstitutesService {
    prisma;
    tenantProvisioningService;
    constructor(prisma, tenantProvisioningService) {
        this.prisma = prisma;
        this.tenantProvisioningService = tenantProvisioningService;
    }
    async create(createInstituteDto) {
        if (createInstituteDto.domain) {
            const existing = await this.prisma.institute.findUnique({
                where: { domain: createInstituteDto.domain }
            });
            if (existing) {
                throw new common_1.ConflictException('Domain already in use by another institute');
            }
        }
        const { profile, settings, ...rest } = createInstituteDto;
        const institute = await this.prisma.institute.create({
            data: {
                ...rest,
                profile: profile,
                settings: settings
            }
        });
        if (settings && 'subscriptionPlanId' in settings && settings.subscriptionPlanId) {
            const newPlanId = settings.subscriptionPlanId;
            const plan = await this.prisma.subscriptionPlan.findUnique({ where: { id: newPlanId } });
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
        if (createInstituteDto.databaseUrl && profile && profile.contactEmail) {
            const adminEmail = profile.contactEmail;
            const adminFirstName = profile.adminName?.split(' ')[0] || 'Admin';
            const adminLastName = profile.adminName?.split(' ').slice(1).join(' ') || '';
            this.tenantProvisioningService.provisionTenant(createInstituteDto.databaseUrl, adminEmail, adminFirstName, adminLastName).then(success => {
                if (!success)
                    console.error(`Failed to provision tenant DB: ${createInstituteDto.databaseUrl}`);
            });
        }
        return institute;
    }
    async findAll(queryOptions) {
        const where = {
            deletedAt: null
        };
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
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(institutes, pageMetaDto);
    }
    async findOne(id) {
        const institute = await this.prisma.institute.findUnique({
            where: { id }
        });
        if (!institute || institute.deletedAt) {
            throw new common_1.NotFoundException(`Institute with ID ${id} not found`);
        }
        return institute;
    }
    async update(id, updateInstituteDto) {
        await this.findOne(id);
        if (updateInstituteDto.domain) {
            const existing = await this.prisma.institute.findUnique({
                where: { domain: updateInstituteDto.domain }
            });
            if (existing && existing.id !== id) {
                throw new common_1.ConflictException('Domain already in use by another institute');
            }
        }
        const { profile, settings, ...rest } = updateInstituteDto;
        const currentInstitute = await this.prisma.institute.findUnique({ where: { id } });
        const updatedProfile = profile
            ? { ...currentInstitute?.profile, ...profile }
            : undefined;
        const updatedSettings = settings
            ? { ...currentInstitute?.settings, ...settings }
            : undefined;
        const result = await this.prisma.institute.update({
            where: { id },
            data: {
                ...rest,
                ...(profile && { profile: updatedProfile }),
                ...(settings && { settings: updatedSettings })
            }
        });
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
                }
                else {
                    console.log(`[InstitutesService] checking plan existence...`);
                    const plan = await this.prisma.subscriptionPlan.findUnique({ where: { id: newPlanId } });
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
            }
            else if (newPlanId === null) {
                console.log(`[InstitutesService] removing subscription for institute ${id}`);
                await this.prisma.subscription.deleteMany({ where: { instituteId: id } });
            }
        }
        return result;
    }
    async updateLogo(id, logoUrl) {
        await this.findOne(id);
        return this.prisma.institute.update({
            where: { id },
            data: { logoUrl }
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.institute.update({
            where: { id },
            data: { deletedAt: new Date(), isActive: false }
        });
        return { message: 'Institute soft-deleted successfully' };
    }
};
exports.InstitutesService = InstitutesService;
exports.InstitutesService = InstitutesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_master_service_1.PrismaMasterService,
        tenant_provisioning_service_1.TenantProvisioningService])
], InstitutesService);
//# sourceMappingURL=institutes.service.js.map