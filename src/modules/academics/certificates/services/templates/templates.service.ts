import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateTemplateDto,
  TemplateQueryOptionsDto,
  UpdateTemplateDto} from '../../dto/template.dto';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateTemplateDto) {
    return this.prisma.certificateTemplate.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: TemplateQueryOptionsDto) {
    const where: Prisma.CertificateTemplateWhereInput = {
      
    };

    if (queryOptions.search) {
      where.name = { contains: queryOptions.search, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.certificateTemplate.count({ where });

    const templates = await this.prisma.certificateTemplate.findMany({
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
    const template = await this.prisma.certificateTemplate.findFirst({
      where: { id}});

    if (!template) {
      throw new NotFoundException('Certificate Template not found');
    }

    return template;
  }

  async update(id: string,  updateDto: UpdateTemplateDto) {
    await this.findOne(id, ); // Ensure exists

    return this.prisma.certificateTemplate.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, ); // Ensure exists

    return this.prisma.certificateTemplate.delete({
      where: { id }});
  }
}
