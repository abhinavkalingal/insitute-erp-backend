import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateGradeRuleDto,
  GradeRuleQueryOptionsDto,
  UpdateGradeRuleDto} from '../../dto/grade.dto';

@Injectable()
export class GradesService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateGradeRuleDto) {
    return this.prisma.gradeRule.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: GradeRuleQueryOptionsDto) {
    const where: Prisma.GradeRuleWhereInput = {
      
    };

    const itemCount = await this.prisma.gradeRule.count({ where });

    const rules = await this.prisma.gradeRule.findMany({
      where,
      orderBy: { minPercent: 'desc' }, // Usually we want highest grades first
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(rules, pageMetaDto);
  }

  async findOne(id: string, ) {
    const rule = await this.prisma.gradeRule.findFirst({
      where: { id}});

    if (!rule) {
      throw new NotFoundException(`Grade Rule not found`);
    }

    return rule;
  }

  async update(id: string,  updateDto: UpdateGradeRuleDto) {
    await this.findOne(id, ); // Ensure exists

    return this.prisma.gradeRule.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, ); // Ensure exists

    return this.prisma.gradeRule.delete({
      where: { id }});
  }
}
