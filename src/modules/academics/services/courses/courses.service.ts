import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CourseQueryOptionsDto, CreateCourseDto, UpdateCourseDto } from '../../dto/course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateCourseDto) {
    const { subjects, ...courseData } = createDto;

    return this.prisma.$transaction(async (tx) => {
      const course = await tx.course.create({
        data: {
          ...courseData}});

      if (subjects && subjects.length > 0) {
        await tx.courseSubject.createMany({
          data: subjects.map((sub) => ({
            courseId: course.id,
            subjectId: sub.subjectId,
            isOptional: sub.isOptional ?? false}))});
      }

      return this.findOne(course.id,  tx);
    });
  }

  async findAll( queryOptions: CourseQueryOptionsDto) {
    const where: Prisma.CourseWhereInput = {
      
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

    const itemCount = await this.prisma.course.count({ where });

    const courses = await this.prisma.course.findMany({
      where,
      include: {
        subjects: {
          include: {
            subject: { select: { id: true, name: true, code: true, credits: true } }}}},
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });

    return new PageDto(courses, pageMetaDto);
  }

  async findOne(id: string,  tx: any = this.prisma) {
    const course = await tx.course.findFirst({
      where: { id,  deletedAt: null },
      include: {
        subjects: {
          include: {
            subject: { select: { id: true, name: true, code: true, credits: true } }}}}});

    if (!course) {
      throw new NotFoundException(`Course not found`);
    }

    return course;
  }

  async update(id: string,  updateDto: UpdateCourseDto) {
    await this.findOne(id, ); // Ensure exists

    const { subjects, ...courseData } = updateDto;

    return this.prisma.$transaction(async (tx) => {
      // Update course primitive fields
      if (Object.keys(courseData).length > 0) {
        await tx.course.update({
          where: { id },
          data: courseData});
      }

      // If subjects array is provided, sync it (delete existing and recreate)
      if (subjects) {
        await tx.courseSubject.deleteMany({
          where: { courseId: id }});

        if (subjects.length > 0) {
          await tx.courseSubject.createMany({
            data: subjects.map((sub) => ({
              courseId: id,
              subjectId: sub.subjectId,
              isOptional: sub.isOptional ?? false}))});
        }
      }

      return this.findOne(id,  tx);
    });
  }

  async remove(id: string, ) {
    await this.findOne(id, ); // Ensure exists

    // Soft delete
    return this.prisma.course.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false }});
  }
}
