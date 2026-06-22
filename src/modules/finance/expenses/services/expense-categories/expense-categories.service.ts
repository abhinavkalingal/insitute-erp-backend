import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateExpenseCategoryDto,
  ExpenseCategoryQueryOptionsDto,
  UpdateExpenseCategoryDto} from '../../dto/expense-category.dto';

@Injectable()
export class ExpenseCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateExpenseCategoryDto) {
    return this.prisma.expenseCategory.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: ExpenseCategoryQueryOptionsDto) {
    const where: Prisma.ExpenseCategoryWhereInput = {
      
    };

    if (queryOptions.search) {
      where.name = { contains: queryOptions.search, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.expenseCategory.count({ where });

    const categories = await this.prisma.expenseCategory.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        _count: { select: { expenses: true } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(categories, pageMetaDto);
  }

  async findOne(id: string, ) {
    const category = await this.prisma.expenseCategory.findFirst({
      where: { id}});

    if (!category) {
      throw new NotFoundException('Expense Category not found');
    }

    return category;
  }

  async update(id: string,  updateDto: UpdateExpenseCategoryDto) {
    await this.findOne(id, );

    return this.prisma.expenseCategory.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, );

    return this.prisma.expenseCategory.delete({
      where: { id }});
  }
}
