import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateExpenseDto, ExpenseQueryOptionsDto, UpdateExpenseDto } from '../../dto/expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateExpenseDto) {
    const category = await this.prisma.expenseCategory.findUnique({
      where: { id: createDto.categoryId }});

    if (!category ) {
      throw new NotFoundException('Expense Category not found');
    }

    if (createDto.vendorId) {
      const vendor = await this.prisma.vendor.findUnique({
        where: { id: createDto.vendorId }});
      if (!vendor ) {
        throw new NotFoundException('Vendor not found');
      }
    }

    return this.prisma.expense.create({
      data: {
        ...createDto},
      include: {
        category: true,
        vendor: true}});
  }

  async findAll( queryOptions: ExpenseQueryOptionsDto) {
    const where: Prisma.ExpenseWhereInput = {
      
    };

    if (queryOptions.categoryId) {
      where.categoryId = queryOptions.categoryId;
    }

    if (queryOptions.vendorId) {
      where.vendorId = queryOptions.vendorId;
    }

    if (queryOptions.status) {
      where.status = queryOptions.status;
    }

    if (queryOptions.startDate || queryOptions.endDate) {
      where.expenseDate = {};
      if (queryOptions.startDate) {
        where.expenseDate.gte = new Date(queryOptions.startDate);
      }
      if (queryOptions.endDate) {
        where.expenseDate.lte = new Date(queryOptions.endDate);
      }
    }

    if (queryOptions.search) {
      where.OR = [
        { title: { contains: queryOptions.search, mode: 'insensitive' } },
        { referenceNumber: { contains: queryOptions.search, mode: 'insensitive' } },
      ];
    }

    const itemCount = await this.prisma.expense.count({ where });

    const expenses = await this.prisma.expense.findMany({
      where,
      orderBy: { expenseDate: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        category: { select: { name: true } },
        vendor: { select: { name: true } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(expenses, pageMetaDto);
  }

  async findOne(id: string, ) {
    const expense = await this.prisma.expense.findFirst({
      where: { id},
      include: {
        category: true,
        vendor: true}});

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }

  async update(id: string,  updateDto: UpdateExpenseDto) {
    await this.findOne(id, );

    if (updateDto.categoryId) {
      const category = await this.prisma.expenseCategory.findUnique({
        where: { id: updateDto.categoryId }});
      if (!category ) {
        throw new NotFoundException('Expense Category not found');
      }
    }

    if (updateDto.vendorId) {
      const vendor = await this.prisma.vendor.findUnique({
        where: { id: updateDto.vendorId }});
      if (!vendor ) {
        throw new NotFoundException('Vendor not found');
      }
    }

    return this.prisma.expense.update({
      where: { id },
      data: updateDto,
      include: {
        category: true,
        vendor: true}});
  }

  async remove(id: string, ) {
    await this.findOne(id, );

    return this.prisma.expense.delete({
      where: { id }});
  }

  async getReport( startDate?: string, endDate?: string) {
    const where: Prisma.ExpenseWhereInput = {
      
      status: 'PAID', // Only report on actual paid expenses
    };

    if (startDate || endDate) {
      where.expenseDate = {};
      if (startDate) {
        where.expenseDate.gte = new Date(startDate);
      }
      if (endDate) {
        where.expenseDate.lte = new Date(endDate);
      }
    }

    // Aggregate by Category
    const categoryAggregation = await this.prisma.expense.groupBy({
      by: ['categoryId'],
      where,
      _sum: {
        amount: true}});

    // We need to fetch the category names
    const categoryIds = categoryAggregation.map((c) => c.categoryId);
    const categories = await this.prisma.expenseCategory.findMany({
      where: { id: { in: categoryIds } },
      select: { id: true, name: true }});

    const categoryMap = new Map(categories.map((c) => [c.id, c.name]));

    const reportByCategory = categoryAggregation.map((item) => ({
      categoryId: item.categoryId,
      categoryName: categoryMap.get(item.categoryId) || 'Unknown',
      totalAmount: item._sum.amount || 0}));

    return {
      period: {
        startDate,
        endDate},
      totalExpenses: reportByCategory.reduce((sum, item) => sum + item.totalAmount, 0),
      byCategory: reportByCategory};
  }
}
