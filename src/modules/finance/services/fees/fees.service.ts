import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateFeeCategoryDto,
  CreateFeeStructureDto,
  FeeCategoryQueryOptionsDto,
  FeeStructureQueryOptionsDto,
  UpdateFeeCategoryDto,
  UpdateFeeStructureDto} from '../../dto/fee.dto';

@Injectable()
export class FeesService {
  constructor(private readonly prisma: PrismaService) {}

  // --- Categories ---

  async createCategory( createDto: CreateFeeCategoryDto) {
    return this.prisma.feeCategory.create({
      data: {
        ...createDto}});
  }

  async findAllCategories( queryOptions: FeeCategoryQueryOptionsDto) {
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
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(categories, pageMetaDto);
  }

  async findOneCategory(id: string, ) {
    const category = await this.prisma.feeCategory.findFirst({
      where: { id}});
    if (!category) throw new NotFoundException('Fee Category not found');
    return category;
  }

  async updateCategory(id: string,  updateDto: UpdateFeeCategoryDto) {
    await this.findOneCategory(id, );
    return this.prisma.feeCategory.update({ where: { id }, data: updateDto });
  }

  async removeCategory(id: string, ) {
    await this.findOneCategory(id, );
    return this.prisma.feeCategory.delete({ where: { id } });
  }

  // --- Structures ---

  async createStructure( createDto: CreateFeeStructureDto) {
    // Ensure category belongs to institute
    await this.findOneCategory(createDto.categoryId, );

    return this.prisma.feeStructure.create({
      data: {
        ...createDto}});
  }

  async findAllStructures( queryOptions: FeeStructureQueryOptionsDto) {
    const where: Prisma.FeeStructureWhereInput = {
      
    };

    if (queryOptions.categoryId) where.categoryId = queryOptions.categoryId;
    if (queryOptions.courseId) where.courseId = queryOptions.courseId;
    if (queryOptions.batchId) where.batchId = queryOptions.batchId;
    if (queryOptions.search) {
      where.name = { contains: queryOptions.search, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.feeStructure.count({ where });

    const structures = await this.prisma.feeStructure.findMany({
      where,
      include: {
        category: { select: { name: true } },
        course: { select: { name: true } },
        batch: { select: { name: true } }},
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(structures, pageMetaDto);
  }

  async findOneStructure(id: string, ) {
    const structure = await this.prisma.feeStructure.findFirst({
      where: { id},
      include: {
        category: { select: { name: true } },
        course: { select: { name: true } },
        batch: { select: { name: true } }}});
    if (!structure) throw new NotFoundException('Fee Structure not found');
    return structure;
  }

  async updateStructure(id: string,  updateDto: UpdateFeeStructureDto) {
    await this.findOneStructure(id, );
    return this.prisma.feeStructure.update({ where: { id }, data: updateDto });
  }

  async removeStructure(id: string, ) {
    await this.findOneStructure(id, );
    return this.prisma.feeStructure.delete({ where: { id } });
  }
}
