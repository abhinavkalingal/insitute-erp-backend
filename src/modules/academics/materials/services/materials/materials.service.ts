import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateMaterialDto,
  MaterialQueryOptionsDto,
  UpdateMaterialDto} from '../../dto/material.dto';

@Injectable()
export class MaterialsService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateMaterialDto) {
    return this.prisma.studyMaterial.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: MaterialQueryOptionsDto) {
    const where: Prisma.StudyMaterialWhereInput = {
      
      deletedAt: null};

    if (queryOptions.categoryId) where.categoryId = queryOptions.categoryId;
    if (queryOptions.subjectId) where.subjectId = queryOptions.subjectId;
    if (queryOptions.courseId) where.courseId = queryOptions.courseId;
    if (queryOptions.batchId) where.batchId = queryOptions.batchId;
    if (queryOptions.staffId) where.staffId = queryOptions.staffId;
    if (queryOptions.search) {
      where.title = { contains: queryOptions.search, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.studyMaterial.count({ where });

    const materials = await this.prisma.studyMaterial.findMany({
      where,
      include: {
        category: { select: { name: true } },
        staff: { include: { user: { select: { firstName: true, lastName: true } } } },
        subject: { select: { name: true } }},
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });

    return new PageDto(materials, pageMetaDto);
  }

  async findOne(id: string, ) {
    const material = await this.prisma.studyMaterial.findFirst({
      where: { id,  deletedAt: null },
      include: {
        category: true,
        staff: { include: { user: { select: { firstName: true, lastName: true } } } },
        subject: { select: { name: true, code: true } },
        course: { select: { name: true } },
        batch: { select: { name: true } }}});

    if (!material) {
      throw new NotFoundException(`Study Material not found`);
    }

    return material;
  }

  async update(id: string,  updateDto: UpdateMaterialDto) {
    await this.findOne(id, ); // Ensure exists

    return this.prisma.studyMaterial.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, ); // Ensure exists

    // Soft delete
    return this.prisma.studyMaterial.update({
      where: { id },
      data: { deletedAt: new Date() }});
  }
}
