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
exports.PlanFeaturesService = void 0;
const prisma_master_service_1 = require("../../../../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
let PlanFeaturesService = class PlanFeaturesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assignFeatureToPlan(planId, assignDto) {
        const plan = await this.prisma.subscriptionPlan.findUnique({
            where: { id: planId }
        });
        if (!plan)
            throw new common_1.NotFoundException('Subscription Plan not found');
        const feature = await this.prisma.saasFeature.findUnique({
            where: { id: assignDto.featureId }
        });
        if (!feature)
            throw new common_1.NotFoundException('Saas Feature not found');
        const existing = await this.prisma.subscriptionPlanFeature.findUnique({
            where: { planId_featureId: { planId, featureId: assignDto.featureId } }
        });
        if (existing)
            throw new common_1.ConflictException('This feature is already assigned to the plan');
        return this.prisma.subscriptionPlanFeature.create({
            data: {
                planId,
                featureId: assignDto.featureId,
                isEnabled: assignDto.isEnabled,
                limitValue: assignDto.limitValue
            },
            include: { feature: true }
        });
    }
    async getPlanFeatures(planId) {
        const plan = await this.prisma.subscriptionPlan.findUnique({
            where: { id: planId }
        });
        if (!plan)
            throw new common_1.NotFoundException('Subscription Plan not found');
        return this.prisma.subscriptionPlanFeature.findMany({
            where: { planId },
            include: { feature: true }
        });
    }
    async updatePlanFeature(planId, featureId, updateDto) {
        const mapping = await this.prisma.subscriptionPlanFeature.findUnique({
            where: { planId_featureId: { planId, featureId } }
        });
        if (!mapping)
            throw new common_1.NotFoundException('Plan Feature mapping not found');
        return this.prisma.subscriptionPlanFeature.update({
            where: { planId_featureId: { planId, featureId } },
            data: updateDto,
            include: { feature: true }
        });
    }
    async removePlanFeature(planId, featureId) {
        const mapping = await this.prisma.subscriptionPlanFeature.findUnique({
            where: { planId_featureId: { planId, featureId } }
        });
        if (!mapping)
            throw new common_1.NotFoundException('Plan Feature mapping not found');
        return this.prisma.subscriptionPlanFeature.delete({
            where: { planId_featureId: { planId, featureId } }
        });
    }
};
exports.PlanFeaturesService = PlanFeaturesService;
exports.PlanFeaturesService = PlanFeaturesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_master_service_1.PrismaMasterService])
], PlanFeaturesService);
//# sourceMappingURL=plan-features.service.js.map