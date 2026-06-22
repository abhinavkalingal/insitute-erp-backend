import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma-master/client';

import {
  CreateSaasFeatureDto,
  SaasFeatureQueryOptionsDto,
  UpdateSaasFeatureDto} from '../../dto/saas-feature.dto';

@Injectable()
export class SaasFeaturesService {
  constructor(private readonly prisma: PrismaMasterService) {}

  async create(createDto: CreateSaasFeatureDto) {
    const existing = await this.prisma.saasFeature.findUnique({
      where: { key: createDto.key }});

    if (existing) {
      throw new ConflictException(`SaasFeature with key ${createDto.key} already exists`);
    }

    return this.prisma.saasFeature.create({
      data: createDto});
  }

  async findAll(queryOptions: SaasFeatureQueryOptionsDto) {
    const where: Prisma.SaasFeatureWhereInput = {};

    if (queryOptions.type) {
      where.type = queryOptions.type;
    }

    if (queryOptions.search) {
      where.OR = [
        { name: { contains: queryOptions.search, mode: 'insensitive' } },
        { key: { contains: queryOptions.search, mode: 'insensitive' } },
      ];
    }

    const itemCount = await this.prisma.saasFeature.count({ where });

    const features = await this.prisma.saasFeature.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(features, pageMetaDto);
  }

  async findOne(id: string) {
    const feature = await this.prisma.saasFeature.findUnique({
      where: { id }});

    if (!feature) {
      throw new NotFoundException('SaasFeature not found');
    }

    return feature;
  }

  async update(id: string, updateDto: UpdateSaasFeatureDto) {
    await this.findOne(id);

    if (updateDto.key) {
      const existing = await this.prisma.saasFeature.findFirst({
        where: { key: updateDto.key, id: { not: id } }});
      if (existing) {
        throw new ConflictException(`SaasFeature with key ${updateDto.key} already exists`);
      }
    }

    return this.prisma.saasFeature.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.saasFeature.delete({
      where: { id }});
  }
}
