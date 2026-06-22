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
exports.SubscriptionsService = void 0;
const prisma_master_service_1 = require("../../../../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
let SubscriptionsService = class SubscriptionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    calculateEndDate(startDate, billingCycle) {
        const end = new Date(startDate);
        if (billingCycle === 'MONTHLY') {
            end.setMonth(end.getMonth() + 1);
        }
        else if (billingCycle === 'YEARLY') {
            end.setFullYear(end.getFullYear() + 1);
        }
        return end;
    }
    async subscribe(instituteId, subscribeDto) {
        return this.prisma.$transaction(async (prisma) => {
            const existing = await prisma.subscription.findFirst({
                where: { instituteId }
            });
            if (existing) {
                throw new common_1.ConflictException('Institute already has a subscription. Use upgrade/downgrade instead.');
            }
            const plan = await prisma.subscriptionPlan.findUnique({
                where: { id: subscribeDto.planId }
            });
            if (!plan || !plan.isActive) {
                throw new common_1.NotFoundException('Subscription Plan not found or inactive');
            }
            const now = new Date();
            let status = 'ACTIVE';
            let trialEndsAt = null;
            if (plan.trialDays > 0) {
                status = 'TRIALING';
                trialEndsAt = new Date(now);
                trialEndsAt.setDate(trialEndsAt.getDate() + plan.trialDays);
            }
            const endDate = this.calculateEndDate(trialEndsAt || now, subscribeDto.billingCycle);
            const subscription = await prisma.subscription.create({
                data: {
                    instituteId,
                    planId: subscribeDto.planId,
                    status,
                    billingCycle: subscribeDto.billingCycle,
                    currentPeriodEnd: endDate,
                    cancelAtPeriodEnd: false
                }
            });
            await prisma.subscriptionHistory.create({
                data: {
                    instituteId,
                    subscriptionId: subscription.id,
                    action: 'CREATED',
                    newPlanId: plan.id,
                    metadata: { planName: plan.name, status, billingCycle: subscribeDto.billingCycle }
                }
            });
            return subscription;
        });
    }
    async changePlan(instituteId, changeDto) {
        return this.prisma.$transaction(async (prisma) => {
            const subscription = await prisma.subscription.findFirst({
                where: { instituteId },
                include: { plan: true }
            });
            if (!subscription) {
                throw new common_1.NotFoundException('No active subscription found');
            }
            const newPlan = await prisma.subscriptionPlan.findUnique({
                where: { id: changeDto.planId }
            });
            if (!newPlan || !newPlan.isActive) {
                throw new common_1.NotFoundException('New Subscription Plan not found or inactive');
            }
            const newCycle = changeDto.billingCycle || subscription.billingCycle;
            let action = 'UPGRADED';
            const currentPrice = subscription.billingCycle === 'YEARLY'
                ? subscription.plan.yearlyPrice
                : subscription.plan.monthlyPrice;
            const nextPrice = newCycle === 'YEARLY' ? newPlan.yearlyPrice : newPlan.monthlyPrice;
            if (nextPrice < currentPrice) {
                action = 'DOWNGRADED';
            }
            const updatedSub = await prisma.subscription.update({
                where: { id: subscription.id },
                data: {
                    planId: newPlan.id,
                    billingCycle: newCycle,
                }
            });
            await prisma.subscriptionHistory.create({
                data: {
                    instituteId,
                    subscriptionId: subscription.id,
                    action,
                    previousPlanId: subscription.planId,
                    newPlanId: newPlan.id,
                    metadata: { previousCycle: subscription.billingCycle, newCycle }
                }
            });
            return updatedSub;
        });
    }
    async cancel(instituteId) {
        return this.prisma.$transaction(async (prisma) => {
            const subscription = await prisma.subscription.findFirst({
                where: { instituteId }
            });
            if (!subscription || subscription.status === 'CANCELED') {
                throw new common_1.NotFoundException('No active subscription found');
            }
            const updatedSub = await prisma.subscription.update({
                where: { id: subscription.id },
                data: {
                    cancelAtPeriodEnd: true,
                }
            });
            await prisma.subscriptionHistory.create({
                data: {
                    instituteId,
                    subscriptionId: subscription.id,
                    action: 'CANCELED',
                    previousPlanId: subscription.planId,
                    metadata: { cancelAtPeriodEnd: true, currentPeriodEnd: subscription.currentPeriodEnd }
                }
            });
            return updatedSub;
        });
    }
    async renew(instituteId) {
        return this.prisma.$transaction(async (prisma) => {
            const subscription = await prisma.subscription.findFirst({
                where: { instituteId }
            });
            if (!subscription) {
                throw new common_1.NotFoundException('No active subscription found');
            }
            const newEndDate = this.calculateEndDate(subscription.currentPeriodEnd, subscription.billingCycle);
            const updatedSub = await prisma.subscription.update({
                where: { id: subscription.id },
                data: {
                    currentPeriodEnd: newEndDate,
                    status: 'ACTIVE',
                    cancelAtPeriodEnd: false
                }
            });
            await prisma.subscriptionHistory.create({
                data: {
                    instituteId,
                    subscriptionId: subscription.id,
                    action: 'RENEWED',
                    previousPlanId: subscription.planId,
                    newPlanId: subscription.planId,
                    metadata: { newEndDate }
                }
            });
            return updatedSub;
        });
    }
    async getMySubscription(instituteId) {
        const subscription = await this.prisma.subscription.findFirst({
            where: { instituteId },
            include: {
                plan: true,
                history: {
                    orderBy: { createdAt: 'desc' },
                    take: 10
                }
            }
        });
        if (!subscription) {
            throw new common_1.NotFoundException('No subscription found for this institute');
        }
        return subscription;
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_master_service_1.PrismaMasterService])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map