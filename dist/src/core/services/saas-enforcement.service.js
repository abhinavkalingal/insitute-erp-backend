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
exports.SaasEnforcementService = void 0;
const prisma_master_service_1 = require("../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
let SaasEnforcementService = class SaasEnforcementService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkLimit(instituteId, featureKey, currentUsage, amountToAdd = 1) {
        const subscription = await this.prisma.subscription.findFirst({
            where: { instituteId, status: { in: ['ACTIVE', 'TRIALING'] } },
            include: {
                plan: {
                    include: {
                        planFeatures: {
                            include: { feature: true }
                        }
                    }
                }
            }
        });
        if (!subscription || (subscription.status !== 'ACTIVE' && subscription.status !== 'TRIALING')) {
            throw new common_1.ForbiddenException(`Active subscription required to utilize ${featureKey}.`);
        }
        const planFeature = subscription.plan.planFeatures.find((pf) => pf.feature.key === featureKey);
        if (!planFeature) {
            throw new common_1.ForbiddenException(`Feature ${featureKey} is not available on your current plan.`);
        }
        if (planFeature.feature.type !== 'LIMIT') {
            throw new Error(`Feature ${featureKey} is not a LIMIT type feature.`);
        }
        const limit = planFeature.limitValue;
        if (limit === null || limit === undefined || limit === -1) {
            return;
        }
        if (currentUsage + amountToAdd > limit) {
            throw new common_1.ForbiddenException(`SaaS limit exceeded for ${featureKey}. Your plan allows a maximum of ${limit}. Currently using ${currentUsage}. Please upgrade your subscription to increase limits.`);
        }
    }
    async checkFeatureAccess(instituteId, featureKey) {
        const subscription = await this.prisma.subscription.findFirst({
            where: { instituteId, status: { in: ['ACTIVE', 'TRIALING'] } },
            include: {
                plan: {
                    include: {
                        planFeatures: {
                            include: { feature: true }
                        }
                    }
                }
            }
        });
        if (!subscription || (subscription.status !== 'ACTIVE' && subscription.status !== 'TRIALING')) {
            throw new common_1.ForbiddenException(`Active subscription required to access ${featureKey}.`);
        }
        const planFeature = subscription.plan.planFeatures.find((pf) => pf.feature.key === featureKey);
        if (!planFeature) {
            throw new common_1.ForbiddenException(`Feature ${featureKey} is not included in your current plan. Please upgrade to access this feature.`);
        }
        if (planFeature.feature.type !== 'BOOLEAN') {
            throw new Error(`Feature ${featureKey} is not a BOOLEAN type feature.`);
        }
        if (!planFeature.isEnabled) {
            throw new common_1.ForbiddenException(`Feature ${featureKey} is disabled on your current plan. Please upgrade to access this feature.`);
        }
    }
};
exports.SaasEnforcementService = SaasEnforcementService;
exports.SaasEnforcementService = SaasEnforcementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_master_service_1.PrismaMasterService])
], SaasEnforcementService);
//# sourceMappingURL=saas-enforcement.service.js.map