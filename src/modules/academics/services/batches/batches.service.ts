import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { BatchQueryOptionsDto, CreateBatchDto, UpdateBatchDto } from '../../dto/batch.dto';

@Injectable()
export class BatchesService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateBatchDto) {
    return this.prisma.batch.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: BatchQueryOptionsDto) {
    const where: Prisma.BatchWhereInput = {
      
      deletedAt: null};

    if (queryOptions.courseId) where.courseId = queryOptions.courseId;
    if (queryOptions.branchId) where.branchId = queryOptions.branchId;

    if (queryOptions.isActive !== undefined) {
      where.isActive = queryOptions.isActive === 'true';
    }

    if (queryOptions.search) {
      where.OR = [{ name: { contains: queryOptions.search, mode: 'insensitive' } }];
    }

    const itemCount = await this.prisma.batch.count({ where });

    const batches = await this.prisma.batch.findMany({
      where,
      include: {
        course: { select: { name: true, code: true } },
        academicYear: { select: { name: true } },
        branch: { select: { name: true } }},
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });

    return new PageDto(batches, pageMetaDto);
  }

  async findOne(id: string, ) {
    const batch = await this.prisma.batch.findFirst({
      where: { id,  deletedAt: null },
      include: {
        course: { select: { name: true, code: true } },
        academicYear: { select: { name: true } },
        branch: { select: { name: true } }}});

    if (!batch) {
      throw new NotFoundException(`Batch not found`);
    }

    return batch;
  }

  async update(id: string,  updateDto: UpdateBatchDto) {
    await this.findOne(id, ); // Ensure exists

    return this.prisma.batch.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, ); // Ensure exists

    // Soft delete
    return this.prisma.batch.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false }});
  }
}
