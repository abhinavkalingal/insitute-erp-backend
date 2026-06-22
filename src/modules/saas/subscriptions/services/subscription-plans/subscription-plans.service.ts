import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma-master/client';

import {
  CreateSubscriptionPlanDto,
  SubscriptionPlanQueryOptionsDto,
  UpdateSubscriptionPlanDto} from '../../dto/subscription-plan.dto';

@Injectable()
export class SubscriptionPlansService {
  constructor(private readonly prisma: PrismaMasterService) {}

  async create(createDto: CreateSubscriptionPlanDto) {
    return this.prisma.subscriptionPlan.create({
      data: createDto});
  }

  async findAll(queryOptions: SubscriptionPlanQueryOptionsDto) {
    const where: Prisma.SubscriptionPlanWhereInput = {};

    if (queryOptions.isActive !== undefined) {
      where.isActive = queryOptions.isActive;
    }

    if (queryOptions.search) {
      where.name = { contains: queryOptions.search, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.subscriptionPlan.count({ where });

    const plans = await this.prisma.subscriptionPlan.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(plans, pageMetaDto);
  }

  async findOne(id: string) {
    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id }});

    if (!plan) {
      throw new NotFoundException('Subscription Plan not found');
    }

    return plan;
  }

  async update(id: string, updateDto: UpdateSubscriptionPlanDto) {
    await this.findOne(id);

    return this.prisma.subscriptionPlan.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string) {
    await this.findOne(id);

    // Soft disable instead of delete if we want to retain history
    return this.prisma.subscriptionPlan.update({
      where: { id },
      data: { isActive: false }});
  }
}
