import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateMaterialCategoryDto,
  MaterialCategoryQueryOptionsDto,
  UpdateMaterialCategoryDto} from '../../dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateMaterialCategoryDto) {
    return this.prisma.materialCategory.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: MaterialCategoryQueryOptionsDto) {
    const where: Prisma.MaterialCategoryWhereInput = {
      
    };

    if (queryOptions.search) {
      where.name = { contains: queryOptions.search, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.materialCategory.count({ where });

    const categories = await this.prisma.materialCategory.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });

    return new PageDto(categories, pageMetaDto);
  }

  async findOne(id: string, ) {
    const category = await this.prisma.materialCategory.findFirst({
      where: { id}});

    if (!category) {
      throw new NotFoundException(`Material Category not found`);
    }

    return category;
  }

  async update(id: string,  updateDto: UpdateMaterialCategoryDto) {
    await this.findOne(id, ); // Ensure exists

    return this.prisma.materialCategory.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, ); // Ensure exists

    return this.prisma.materialCategory.delete({
      where: { id }});
  }
}
