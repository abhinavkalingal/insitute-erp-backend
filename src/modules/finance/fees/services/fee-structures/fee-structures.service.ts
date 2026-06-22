import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateFeeStructureDto,
  FeeStructureQueryOptionsDto,
  UpdateFeeStructureDto} from '../../dto/fee-structure.dto';

@Injectable()
export class FeeStructuresService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateFeeStructureDto) {
    const { installments, ...structureData } = createDto;

    // Verify category exists and belongs to institute
    const category = await this.prisma.feeCategory.findUnique({
      where: { id: structureData.categoryId }});

    if (!category ) {
      throw new NotFoundException('Fee Category not found');
    }

    return this.prisma.feeStructure.create({
      data: {
        ...structureData,
        
        installments: installments
          ? {
              create: installments}
          : undefined},
      include: {
        installments: true}});
  }

  async findAll( queryOptions: FeeStructureQueryOptionsDto) {
    const where: Prisma.FeeStructureWhereInput = {
      
    };

    if (queryOptions.search) {
      where.name = { contains: queryOptions.search, mode: 'insensitive' };
    }

    if (queryOptions.categoryId) {
      where.categoryId = queryOptions.categoryId;
    }

    const itemCount = await this.prisma.feeStructure.count({ where });

    const structures = await this.prisma.feeStructure.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        category: { select: { name: true } },
        installments: true}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(structures, pageMetaDto);
  }

  async findOne(id: string, ) {
    const structure = await this.prisma.feeStructure.findFirst({
      where: { id},
      include: {
        category: true,
        installments: true}});

    if (!structure) {
      throw new NotFoundException('Fee Structure not found');
    }

    return structure;
  }

  async update(id: string,  updateDto: UpdateFeeStructureDto) {
    await this.findOne(id, );

    const { installments, ...structureData } = updateDto;

    if (structureData.categoryId) {
      const category = await this.prisma.feeCategory.findUnique({
        where: { id: structureData.categoryId }});
      if (!category ) {
        throw new NotFoundException('Fee Category not found');
      }
    }

    // For simplicity, if installments are provided in update, we replace the old ones.
    // In a real system, you might want more granular add/remove/update logic for installments.
    if (installments) {
      await this.prisma.installmentPlan.deleteMany({
        where: { feeStructureId: id }});
    }

    return this.prisma.feeStructure.update({
      where: { id },
      data: {
        ...structureData,
        installments: installments
          ? {
              create: installments}
          : undefined},
      include: {
        installments: true}});
  }

  async remove(id: string, ) {
    await this.findOne(id, );

    return this.prisma.feeStructure.delete({
      where: { id }});
  }
}
