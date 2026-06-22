import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateEventCategoryDto,
  EventCategoryQueryOptionsDto,
  UpdateEventCategoryDto} from '../../dto/category.dto';

@Injectable()
export class EventCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateEventCategoryDto) {
    return this.prisma.eventCategory.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: EventCategoryQueryOptionsDto) {
    const where: Prisma.EventCategoryWhereInput = {
      
    };

    if (queryOptions.search) {
      where.name = { contains: queryOptions.search, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.eventCategory.count({ where });

    const categories = await this.prisma.eventCategory.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        _count: { select: { events: true } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(categories, pageMetaDto);
  }

  async findOne(id: string, ) {
    const category = await this.prisma.eventCategory.findFirst({
      where: { id}});

    if (!category) {
      throw new NotFoundException('Event Category not found');
    }

    return category;
  }

  async update(id: string,  updateDto: UpdateEventCategoryDto) {
    await this.findOne(id, );

    return this.prisma.eventCategory.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, );

    return this.prisma.eventCategory.delete({
      where: { id }});
  }
}
