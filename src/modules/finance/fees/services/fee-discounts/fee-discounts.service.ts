import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateFeeDiscountDto,
  FeeDiscountQueryOptionsDto,
  UpdateFeeDiscountDto} from '../../dto/fee-discount.dto';

@Injectable()
export class FeeDiscountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateFeeDiscountDto) {
    return this.prisma.feeDiscount.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: FeeDiscountQueryOptionsDto) {
    const where: Prisma.FeeDiscountWhereInput = {
      
    };

    if (queryOptions.search) {
      where.name = { contains: queryOptions.search, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.feeDiscount.count({ where });

    const discounts = await this.prisma.feeDiscount.findMany({
      where,
      orderBy: { name: queryOptions.order }, // Cannot order by created_at since it doesn't exist
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(discounts, pageMetaDto);
  }

  async findOne(id: string, ) {
    const discount = await this.prisma.feeDiscount.findFirst({
      where: { id}});

    if (!discount) {
      throw new NotFoundException('Fee Discount not found');
    }

    return discount;
  }

  async update(id: string,  updateDto: UpdateFeeDiscountDto) {
    await this.findOne(id, );

    return this.prisma.feeDiscount.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, );

    return this.prisma.feeDiscount.delete({
      where: { id }});
  }
}
