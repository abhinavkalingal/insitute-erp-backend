import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  AssignmentQueryOptionsDto,
  CreateAssignmentDto,
  UpdateAssignmentDto} from '../../dto/assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create( staffId: string, createDto: CreateAssignmentDto) {
    return this.prisma.assignment.create({
      data: {
        ...createDto,
        
        staffId,
        dueDate: new Date(createDto.dueDate)}});
  }

  async findAll( queryOptions: AssignmentQueryOptionsDto) {
    const where: Prisma.AssignmentWhereInput = {
      
      deletedAt: null};

    if (queryOptions.subjectId) where.subjectId = queryOptions.subjectId;
    if (queryOptions.courseId) where.courseId = queryOptions.courseId;
    if (queryOptions.batchId) where.batchId = queryOptions.batchId;
    if (queryOptions.staffId) where.staffId = queryOptions.staffId;
    if (queryOptions.search) {
      where.title = { contains: queryOptions.search, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.assignment.count({ where });

    const assignments = await this.prisma.assignment.findMany({
      where,
      include: {
        staff: { include: { user: { select: { firstName: true, lastName: true } } } },
        subject: { select: { name: true, code: true } },
        batch: { select: { name: true } },
        _count: { select: { submissions: true } }},
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });

    return new PageDto(assignments, pageMetaDto);
  }

  async findOne(id: string, ) {
    const assignment = await this.prisma.assignment.findFirst({
      where: { id,  deletedAt: null },
      include: {
        staff: { include: { user: { select: { firstName: true, lastName: true } } } },
        subject: { select: { name: true, code: true } },
        course: { select: { name: true } },
        batch: { select: { name: true } },
        submissions: {
          include: {
            student: {
              include: { user: { select: { firstName: true, lastName: true, email: true } } }},
            gradedBy: { include: { user: { select: { firstName: true, lastName: true } } } }}}}});

    if (!assignment) {
      throw new NotFoundException(`Assignment not found`);
    }

    return assignment;
  }

  async update(id: string,  updateDto: UpdateAssignmentDto) {
    await this.findOne(id, ); // Ensure exists

    const data: Prisma.AssignmentUpdateInput = { ...updateDto };
    if (updateDto.dueDate) {
      data.dueDate = new Date(updateDto.dueDate);
    }

    return this.prisma.assignment.update({
      where: { id },
      data});
  }

  async remove(id: string, ) {
    await this.findOne(id, ); // Ensure exists

    // Soft delete
    return this.prisma.assignment.update({
      where: { id },
      data: { deletedAt: new Date() }});
  }
}
