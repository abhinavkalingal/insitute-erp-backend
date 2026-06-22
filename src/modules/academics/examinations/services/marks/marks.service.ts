import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { BulkUpsertMarksDto, MarkQueryOptionsDto } from '../../dto/mark.dto';

@Injectable()
export class MarksService {
  constructor(private readonly prisma: PrismaService) {}

  async bulkUpsertMarks( bulkDto: BulkUpsertMarksDto) {
    // 1. Fetch Exam and ExamTerm to verify existence and check the publish lock
    const exam = await this.prisma.exam.findFirst({
      where: { id: bulkDto.examId},
      include: { term: true }});

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    if (exam.term.isPublished) {
      throw new ForbiddenException(
        'Cannot modify marks because the Exam Term is already published.',
      );
    }

    // 2. Perform bulk upsert in a transaction
    return this.prisma.$transaction(
      bulkDto.marks.map((mark) => {
        return this.prisma.examMark.upsert({
          where: {
            examId_studentId: {
              examId: bulkDto.examId,
              studentId: mark.studentId}},
          create: {
            examId: bulkDto.examId,
            studentId: mark.studentId,
            marksObtained: mark.marksObtained,
            remarks: mark.remarks,
            isAbsent: mark.isAbsent ?? false},
          update: {
            marksObtained: mark.marksObtained,
            remarks: mark.remarks,
            isAbsent: mark.isAbsent ?? false}});
      }),
    );
  }

  async findAll( queryOptions: MarkQueryOptionsDto) {
    const where: Prisma.ExamMarkWhereInput = {
      exam: { }};

    if (queryOptions.examId) where.examId = queryOptions.examId;
    if (queryOptions.studentId) where.studentId = queryOptions.studentId;

    const itemCount = await this.prisma.examMark.count({ where });

    const marks = await this.prisma.examMark.findMany({
      where,
      include: {
        student: { include: { user: { select: { firstName: true, lastName: true } } } },
        exam: {
          select: { maxMarks: true, passingMarks: true, subject: { select: { name: true } } }}},
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(marks, pageMetaDto);
  }
}
