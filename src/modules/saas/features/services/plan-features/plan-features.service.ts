import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { AssignPlanFeatureDto, UpdatePlanFeatureDto } from '../../dto/plan-feature.dto';

@Injectable()
export class PlanFeaturesService {
  constructor(private readonly prisma: PrismaMasterService) {}

  async assignFeatureToPlan(planId: string, assignDto: AssignPlanFeatureDto) {
    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id: planId }});

    if (!plan) throw new NotFoundException('Subscription Plan not found');

    const feature = await this.prisma.saasFeature.findUnique({
      where: { id: assignDto.featureId }});

    if (!feature) throw new NotFoundException('Saas Feature not found');

    const existing = await this.prisma.subscriptionPlanFeature.findUnique({
      where: { planId_featureId: { planId, featureId: assignDto.featureId } }});

    if (existing) throw new ConflictException('This feature is already assigned to the plan');

    return this.prisma.subscriptionPlanFeature.create({
      data: {
        planId,
        featureId: assignDto.featureId,
        isEnabled: assignDto.isEnabled,
        limitValue: assignDto.limitValue},
      include: { feature: true }});
  }

  async getPlanFeatures(planId: string) {
    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id: planId }});

    if (!plan) throw new NotFoundException('Subscription Plan not found');

    return this.prisma.subscriptionPlanFeature.findMany({
      where: { planId },
      include: { feature: true }});
  }

  async updatePlanFeature(planId: string, featureId: string, updateDto: UpdatePlanFeatureDto) {
    const mapping = await this.prisma.subscriptionPlanFeature.findUnique({
      where: { planId_featureId: { planId, featureId } }});

    if (!mapping) throw new NotFoundException('Plan Feature mapping not found');

    return this.prisma.subscriptionPlanFeature.update({
      where: { planId_featureId: { planId, featureId } },
      data: updateDto,
      include: { feature: true }});
  }

  async removePlanFeature(planId: string, featureId: string) {
    const mapping = await this.prisma.subscriptionPlanFeature.findUnique({
      where: { planId_featureId: { planId, featureId } }});

    if (!mapping) throw new NotFoundException('Plan Feature mapping not found');

    return this.prisma.subscriptionPlanFeature.delete({
      where: { planId_featureId: { planId, featureId } }});
  }
}
