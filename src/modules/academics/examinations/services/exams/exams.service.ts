import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateExamDto,
  CreateExamTermDto,
  ExamQueryOptionsDto,
  ExamTermQueryOptionsDto,
  UpdateExamDto,
  UpdateExamTermDto} from '../../dto/exam.dto';

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}

  // --- Exam Terms ---

  async createTerm( createDto: CreateExamTermDto) {
    return this.prisma.examTerm.create({
      data: {
        ...createDto,
        
        startDate: new Date(createDto.startDate),
        endDate: new Date(createDto.endDate)}});
  }

  async findAllTerms( queryOptions: ExamTermQueryOptionsDto) {
    const where: Prisma.ExamTermWhereInput = {
      
    };

    if (queryOptions.search) {
      where.name = { contains: queryOptions.search, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.examTerm.count({ where });

    const terms = await this.prisma.examTerm.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        _count: { select: { exams: true } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(terms, pageMetaDto);
  }

  async findOneTerm(id: string, ) {
    const term = await this.prisma.examTerm.findFirst({
      where: { id},
      include: { exams: true }});

    if (!term) throw new NotFoundException('Exam Term not found');
    return term;
  }

  async updateTerm(id: string,  updateDto: UpdateExamTermDto) {
    await this.findOneTerm(id, );

    const data: Prisma.ExamTermUpdateInput = { ...updateDto };
    if (updateDto.startDate) data.startDate = new Date(updateDto.startDate);
    if (updateDto.endDate) data.endDate = new Date(updateDto.endDate);

    return this.prisma.examTerm.update({
      where: { id },
      data});
  }

  async removeTerm(id: string, ) {
    await this.findOneTerm(id, );
    return this.prisma.examTerm.delete({ where: { id } });
  }

  // --- Specific Exams ---

  async createExam( createDto: CreateExamDto) {
    // Validate term exists
    await this.findOneTerm(createDto.examTermId, );

    return this.prisma.exam.create({
      data: {
        ...createDto,
        
        date: new Date(createDto.date)}});
  }

  async findAllExams( queryOptions: ExamQueryOptionsDto) {
    const where: Prisma.ExamWhereInput = { };

    if (queryOptions.examTermId) where.examTermId = queryOptions.examTermId;
    if (queryOptions.subjectId) where.subjectId = queryOptions.subjectId;
    if (queryOptions.courseId) where.courseId = queryOptions.courseId;
    if (queryOptions.batchId) where.batchId = queryOptions.batchId;

    const itemCount = await this.prisma.exam.count({ where });

    const exams = await this.prisma.exam.findMany({
      where,
      orderBy: { date: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        term: { select: { name: true, isPublished: true } },
        subject: { select: { name: true, code: true } },
        course: { select: { name: true } },
        batch: { select: { name: true } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(exams, pageMetaDto);
  }

  async findOneExam(id: string, ) {
    const exam = await this.prisma.exam.findFirst({
      where: { id},
      include: {
        term: true,
        subject: true,
        course: true,
        batch: true}});

    if (!exam) throw new NotFoundException('Exam not found');
    return exam;
  }

  async updateExam(id: string,  updateDto: UpdateExamDto) {
    await this.findOneExam(id, );

    const data: Prisma.ExamUpdateInput = { ...updateDto };
    if (updateDto.date) data.date = new Date(updateDto.date);

    return this.prisma.exam.update({
      where: { id },
      data});
  }

  async removeExam(id: string, ) {
    await this.findOneExam(id, );
    return this.prisma.exam.delete({ where: { id } });
  }
}
