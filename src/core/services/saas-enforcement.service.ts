import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SaasEnforcementService {
  constructor(private readonly prisma: PrismaMasterService) {}

  /**
   * Validates if the current usage of a feature exceeds the institute's subscription limit.
   * If the limit is exceeded, throws a ForbiddenException.
   *
   * @param The ID of the institute
   * @param featureKey The unique string key of the feature (e.g., 'MAX_BRANCHES')
   * @param currentUsage The number of items the institute currently has (e.g., currently has 2 branches, trying to add a 3rd -> pass 2)
   * @param amountToAdd The amount being added in this transaction (default 1)
   */
  async checkLimit(
    instituteId: string,
    featureKey: string,
    currentUsage: number,
    amountToAdd: number = 1,
  ): Promise<void> {
    const subscription = await this.prisma.subscription.findFirst({
      where: { instituteId, status: { in: ['ACTIVE', 'TRIALING'] } },
      include: {
        plan: {
          include: {
            planFeatures: {
              include: { feature: true }}}}}});

    // If they have no active subscription, maybe default to blocked or a free tier?
    // Assuming they must have a subscription to use features with limits:
    if (!subscription || (subscription.status !== 'ACTIVE' && subscription.status !== 'TRIALING')) {
      throw new ForbiddenException(`Active subscription required to utilize ${featureKey}.`);
    }

    const planFeature = subscription.plan.planFeatures.find((pf) => pf.feature.key === featureKey);

    if (!planFeature) {
      // If the feature isn't mapped to their plan at all, it's not allowed
      throw new ForbiddenException(`Feature ${featureKey} is not available on your current plan.`);
    }

    if (planFeature.feature.type !== 'LIMIT') {
      throw new Error(`Feature ${featureKey} is not a LIMIT type feature.`);
    }

    const limit = planFeature.limitValue;

    // -1 implies unlimited
    if (limit === null || limit === undefined || limit === -1) {
      return;
    }

    if (currentUsage + amountToAdd > limit) {
      throw new ForbiddenException(
        `SaaS limit exceeded for ${featureKey}. Your plan allows a maximum of ${limit}. Currently using ${currentUsage}. Please upgrade your subscription to increase limits.`,
      );
    }
  }

  /**
   * Checks if a boolean feature toggle is enabled for the institute's active subscription.
   * If disabled, throws a ForbiddenException.
   *
   * @param The ID of the institute
   * @param featureKey The unique string key of the feature (e.g., 'ENABLE_PAYROLL')
   */
  async checkFeatureAccess(instituteId: string, featureKey: string): Promise<void> {
    const subscription = await this.prisma.subscription.findFirst({
      where: { instituteId, status: { in: ['ACTIVE', 'TRIALING'] } },
      include: {
        plan: {
          include: {
            planFeatures: {
              include: { feature: true }}}}}});

    if (!subscription || (subscription.status !== 'ACTIVE' && subscription.status !== 'TRIALING')) {
      throw new ForbiddenException(`Active subscription required to access ${featureKey}.`);
    }

    const planFeature = subscription.plan.planFeatures.find((pf) => pf.feature.key === featureKey);

    if (!planFeature) {
      throw new ForbiddenException(
        `Feature ${featureKey} is not included in your current plan. Please upgrade to access this feature.`,
      );
    }

    if (planFeature.feature.type !== 'BOOLEAN') {
      throw new Error(`Feature ${featureKey} is not a BOOLEAN type feature.`);
    }

    if (!planFeature.isEnabled) {
      throw new ForbiddenException(
        `Feature ${featureKey} is disabled on your current plan. Please upgrade to access this feature.`,
      );
    }
  }
}
