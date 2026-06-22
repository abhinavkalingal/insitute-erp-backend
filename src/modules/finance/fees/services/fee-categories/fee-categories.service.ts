import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateFeeCategoryDto,
  FeeCategoryQueryOptionsDto,
  UpdateFeeCategoryDto} from '../../dto/fee-category.dto';

@Injectable()
export class FeeCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateFeeCategoryDto) {
    return this.prisma.feeCategory.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: FeeCategoryQueryOptionsDto) {
    const where: Prisma.FeeCategoryWhereInput = {
      
    };

    if (queryOptions.search) {
      where.name = { contains: queryOptions.search, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.feeCategory.count({ where });

    const categories = await this.prisma.feeCategory.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        _count: { select: { structures: true } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(categories, pageMetaDto);
  }

  async findOne(id: string, ) {
    const category = await this.prisma.feeCategory.findFirst({
      where: { id}});

    if (!category) {
      throw new NotFoundException('Fee Category not found');
    }

    return category;
  }

  async update(id: string,  updateDto: UpdateFeeCategoryDto) {
    await this.findOne(id, );

    return this.prisma.feeCategory.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, );

    return this.prisma.feeCategory.delete({
      where: { id }});
  }
}
