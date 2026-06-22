import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateFineRuleDto,
  FineRuleQueryOptionsDto,
  UpdateFineRuleDto} from '../../dto/fine-rule.dto';

@Injectable()
export class FineRulesService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateFineRuleDto) {
    return this.prisma.fineRule.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: FineRuleQueryOptionsDto) {
    const where: Prisma.FineRuleWhereInput = {
      
    };

    if (queryOptions.search) {
      where.name = { contains: queryOptions.search, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.fineRule.count({ where });

    const rules = await this.prisma.fineRule.findMany({
      where,
      orderBy: { name: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(rules, pageMetaDto);
  }

  async findOne(id: string, ) {
    const rule = await this.prisma.fineRule.findFirst({
      where: { id}});

    if (!rule) {
      throw new NotFoundException('Fine Rule not found');
    }

    return rule;
  }

  async update(id: string,  updateDto: UpdateFineRuleDto) {
    await this.findOne(id, );

    return this.prisma.fineRule.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, );

    return this.prisma.fineRule.delete({
      where: { id }});
  }
}
