import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException} from '@nestjs/common';
import { Prisma } from '@prisma-master/client';

import {
  SubscribeDto,
  SubscriptionQueryOptionsDto,
  UpgradeDowngradeDto} from '../../dto/subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaMasterService) {}

  private calculateEndDate(startDate: Date, billingCycle: string): Date {
    const end = new Date(startDate);
    if (billingCycle === 'MONTHLY') {
      end.setMonth(end.getMonth() + 1);
    } else if (billingCycle === 'YEARLY') {
      end.setFullYear(end.getFullYear() + 1);
    }
    return end;
  }

  async subscribe(instituteId: string, subscribeDto: SubscribeDto) {
    return this.prisma.$transaction(async (prisma) => {
      // 1. Check if already subscribed
      const existing = await prisma.subscription.findFirst({
        where: { instituteId }});

      if (existing) {
        throw new ConflictException(
          'Institute already has a subscription. Use upgrade/downgrade instead.',
        );
      }

      // 2. Validate plan
      const plan = await prisma.subscriptionPlan.findUnique({
        where: { id: subscribeDto.planId }});

      if (!plan || !plan.isActive) {
        throw new NotFoundException('Subscription Plan not found or inactive');
      }

      const now = new Date();
      let status = 'ACTIVE';
      let trialEndsAt: Date | null = null;

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
        }});

      // 4. Log History
      await prisma.subscriptionHistory.create({
        data: {
          instituteId,
          subscriptionId: subscription.id,
          action: 'CREATED',
          newPlanId: plan.id,
          metadata: { planName: plan.name, status, billingCycle: subscribeDto.billingCycle }}});

      return subscription;
    });
  }

  async changePlan(instituteId: string, changeDto: UpgradeDowngradeDto) {
    return this.prisma.$transaction(async (prisma) => {
      const subscription = await prisma.subscription.findFirst({
        where: { instituteId },
        include: { plan: true }});

      if (!subscription) {
        throw new NotFoundException('No active subscription found');
      }

      const newPlan = await prisma.subscriptionPlan.findUnique({
        where: { id: changeDto.planId }});

      if (!newPlan || !newPlan.isActive) {
        throw new NotFoundException('New Subscription Plan not found or inactive');
      }

      const newCycle = changeDto.billingCycle || subscription.billingCycle;

      // Determine if upgrade or downgrade based on price (simple heuristic, can be more complex)
      let action = 'UPGRADED';
      const currentPrice =
        subscription.billingCycle === 'YEARLY'
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
          // Proration logic would go here, for now we just change the plan pointer
        }});

      await prisma.subscriptionHistory.create({
        data: {
          instituteId,
          subscriptionId: subscription.id,
          action,
          previousPlanId: subscription.planId,
          newPlanId: newPlan.id,
          metadata: { previousCycle: subscription.billingCycle, newCycle }}});

      return updatedSub;
    });
  }

  async cancel(instituteId: string) {
    return this.prisma.$transaction(async (prisma) => {
      const subscription = await prisma.subscription.findFirst({
        where: { instituteId }});

      if (!subscription || subscription.status === 'CANCELED') {
        throw new NotFoundException('No active subscription found');
      }

      const updatedSub = await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          cancelAtPeriodEnd: true,
          // Not setting status to CANCELED immediately to allow usage until period end
        }});

      await prisma.subscriptionHistory.create({
        data: {
          instituteId,
          subscriptionId: subscription.id,
          action: 'CANCELED',
          previousPlanId: subscription.planId,
          metadata: { cancelAtPeriodEnd: true, currentPeriodEnd: subscription.currentPeriodEnd }}});

      return updatedSub;
    });
  }

  async renew(instituteId: string) {
    return this.prisma.$transaction(async (prisma) => {
      const subscription = await prisma.subscription.findFirst({
        where: { instituteId }});

      if (!subscription) {
        throw new NotFoundException('No active subscription found');
      }

      const newEndDate = this.calculateEndDate(subscription.currentPeriodEnd, subscription.billingCycle);

      const updatedSub = await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          currentPeriodEnd: newEndDate,
          status: 'ACTIVE',
          cancelAtPeriodEnd: false}});

      await prisma.subscriptionHistory.create({
        data: {
          instituteId,
          subscriptionId: subscription.id,
          action: 'RENEWED',
          previousPlanId: subscription.planId,
          newPlanId: subscription.planId,
          metadata: { newEndDate }}});

      return updatedSub;
    });
  }

  async getMySubscription(instituteId: string) {
    const subscription = await this.prisma.subscription.findFirst({
      where: { instituteId },
      include: {
        plan: true,
        history: {
          orderBy: { createdAt: 'desc' },
          take: 10}}});

    if (!subscription) {
      throw new NotFoundException('No subscription found for this institute');
    }

    return subscription;
  }
}
