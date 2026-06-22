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
exports.WhiteLabelService = void 0;
const saas_enforcement_service_1 = require("../../../../../core/services/saas-enforcement.service");
const prisma_master_service_1 = require("../../../../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
let WhiteLabelService = class WhiteLabelService {
    prisma;
    saasEnforcement;
    constructor(prisma, saasEnforcement) {
        this.prisma = prisma;
        this.saasEnforcement = saasEnforcement;
    }
    async getBranding(instituteId) {
        const branding = await this.prisma.instituteBranding.findUnique({
            where: { instituteId }
        });
        if (!branding) {
            return this.prisma.instituteBranding.create({
                data: { instituteId }
            });
        }
        return branding;
    }
    async updateBranding(instituteId, updateDto) {
        if (updateDto.hideSaasBranding === true) {
            await this.saasEnforcement.checkFeatureAccess(instituteId, 'ENABLE_WHITE_LABEL');
        }
        const existing = await this.prisma.instituteBranding.findUnique({
            where: { instituteId }
        });
        if (existing) {
            return this.prisma.instituteBranding.update({
                where: { instituteId },
                data: updateDto
            });
        }
        return this.prisma.instituteBranding.create({
            data: {
                instituteId,
                ...updateDto
            }
        });
    }
    async getPublicBrandingByDomain(domain) {
        const institutes = await this.prisma.institute.findMany({
            where: {
                profile: {
                    path: ['domain'],
                    equals: domain
                }
            },
            include: { branding: true },
            take: 1
        });
        if (institutes.length === 0) {
            throw new common_1.NotFoundException('Institute not found for this domain');
        }
        const institute = institutes[0];
        const branding = institute.branding;
        return {
            instituteName: institute.name,
            logoUrl: branding?.logoUrl || null,
            faviconUrl: branding?.faviconUrl || null,
            primaryColor: branding?.primaryColor || '#2563EB',
            secondaryColor: branding?.secondaryColor || '#1E40AF',
            loginBackgroundUrl: branding?.loginBackgroundUrl || null,
            loginLayout: branding?.loginLayout || 'split',
            hideSaasBranding: branding?.hideSaasBranding || false
        };
    }
};
exports.WhiteLabelService = WhiteLabelService;
exports.WhiteLabelService = WhiteLabelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_master_service_1.PrismaMasterService,
        saas_enforcement_service_1.SaasEnforcementService])
], WhiteLabelService);
//# sourceMappingURL=white-label.service.js.map