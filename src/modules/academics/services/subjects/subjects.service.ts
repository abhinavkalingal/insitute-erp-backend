import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateSubjectDto, SubjectQueryOptionsDto, UpdateSubjectDto } from '../../dto/subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateSubjectDto) {
    return this.prisma.subject.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: SubjectQueryOptionsDto) {
    const where: Prisma.SubjectWhereInput = {
      
      deletedAt: null};

    if (queryOptions.isActive !== undefined) {
      where.isActive = queryOptions.isActive === 'true';
    }

    if (queryOptions.search) {
      where.OR = [
        { name: { contains: queryOptions.search, mode: 'insensitive' } },
        { code: { contains: queryOptions.search, mode: 'insensitive' } },
      ];
    }

    const itemCount = await this.prisma.subject.count({ where });

    const subjects = await this.prisma.subject.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });

    return new PageDto(subjects, pageMetaDto);
  }

  async findOne(id: string, ) {
    const subject = await this.prisma.subject.findFirst({
      where: { id,  deletedAt: null }});

    if (!subject) {
      throw new NotFoundException(`Subject not found`);
    }

    return subject;
  }

  async update(id: string,  updateDto: UpdateSubjectDto) {
    await this.findOne(id, ); // Ensure exists

    return this.prisma.subject.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, ); // Ensure exists

    // Soft delete
    return this.prisma.subject.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false }});
  }
}
