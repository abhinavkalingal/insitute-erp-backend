import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  AcademicYearQueryOptionsDto,
  CreateAcademicYearDto,
  UpdateAcademicYearDto} from '../../dto/academic-year.dto';

@Injectable()
export class AcademicYearsService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateAcademicYearDto) {
    return this.prisma.academicYear.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: AcademicYearQueryOptionsDto) {
    const where: Prisma.AcademicYearWhereInput = {
      
    };

    if (queryOptions.isActive !== undefined) {
      where.isActive = queryOptions.isActive === 'true';
    }

    if (queryOptions.search) {
      where.OR = [{ name: { contains: queryOptions.search, mode: 'insensitive' } }];
    }

    const itemCount = await this.prisma.academicYear.count({ where });

    const academicYears = await this.prisma.academicYear.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });

    return new PageDto(academicYears, pageMetaDto);
  }

  async findOne(id: string, ) {
    const academicYear = await this.prisma.academicYear.findFirst({
      where: { id}});

    if (!academicYear) {
      throw new NotFoundException(`Academic Year not found`);
    }

    return academicYear;
  }

  async update(id: string,  updateDto: UpdateAcademicYearDto) {
    await this.findOne(id, ); // Ensure exists

    return this.prisma.academicYear.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, ); // Ensure exists

    await this.prisma.academicYear.delete({
      where: { id }});

    return { message: 'Academic Year deleted successfully' };
  }
}
