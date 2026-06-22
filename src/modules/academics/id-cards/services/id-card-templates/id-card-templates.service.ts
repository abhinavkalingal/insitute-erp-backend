import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateIdTemplateDto,
  IdTemplateQueryOptionsDto,
  UpdateIdTemplateDto} from '../../dto/id-template.dto';

@Injectable()
export class IdCardTemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateIdTemplateDto) {
    return this.prisma.idCardTemplate.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: IdTemplateQueryOptionsDto) {
    const where: Prisma.IdCardTemplateWhereInput = {
      
    };

    if (queryOptions.search) {
      where.name = { contains: queryOptions.search, mode: 'insensitive' };
    }

    if (queryOptions.roleType) {
      where.roleType = queryOptions.roleType;
    }

    const itemCount = await this.prisma.idCardTemplate.count({ where });

    const templates = await this.prisma.idCardTemplate.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        _count: { select: { issued: true } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(templates, pageMetaDto);
  }

  async findOne(id: string, ) {
    const template = await this.prisma.idCardTemplate.findFirst({
      where: { id}});

    if (!template) {
      throw new NotFoundException('ID Card Template not found');
    }

    return template;
  }

  async update(id: string,  updateDto: UpdateIdTemplateDto) {
    await this.findOne(id, ); // Ensure exists

    return this.prisma.idCardTemplate.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, ); // Ensure exists

    return this.prisma.idCardTemplate.delete({
      where: { id }});
  }
}
