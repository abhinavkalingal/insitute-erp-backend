import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateSubmissionDto,
  GradeSubmissionDto,
  SubmissionQueryOptionsDto} from '../../dto/submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async submit(createDto: CreateSubmissionDto, studentId: string) {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id: createDto.assignmentId }});

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    // Determine status based on due date
    const now = new Date();
    const isLate = now > assignment.dueDate;
    const status = isLate ? 'LATE' : 'SUBMITTED';

    // Upsert submission (only one submission allowed, so if they submit again, it updates)
    return this.prisma.assignmentSubmission.upsert({
      where: {
        assignmentId_studentId: {
          assignmentId: createDto.assignmentId,
          studentId}},
      create: {
        assignmentId: createDto.assignmentId,
        studentId,
        content: createDto.content,
        fileUrl: createDto.fileUrl,
        status,
        submittedAt: now},
      update: {
        content: createDto.content,
        fileUrl: createDto.fileUrl,
        status, // If they update late, it becomes late
        submittedAt: now}});
  }

  async grade(submissionId: string, staffId: string, gradeDto: GradeSubmissionDto) {
    const submission = await this.prisma.assignmentSubmission.findUnique({
      where: { id: submissionId },
      include: { assignment: true }});

    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    if (submission.assignment.maxMarks && gradeDto.marksObtained > submission.assignment.maxMarks) {
      throw new BadRequestException(
        `Marks cannot exceed the maximum allowed (${submission.assignment.maxMarks})`,
      );
    }

    return this.prisma.assignmentSubmission.update({
      where: { id: submissionId },
      data: {
        marksObtained: gradeDto.marksObtained,
        feedback: gradeDto.feedback,
        gradedById: staffId,
        gradedAt: new Date(),
        status: 'GRADED'},
      include: {
        student: { include: { user: { select: { firstName: true, lastName: true } } } },
        gradedBy: { include: { user: { select: { firstName: true, lastName: true } } } }}});
  }

  async findAll( queryOptions: SubmissionQueryOptionsDto) {
    const where: Prisma.AssignmentSubmissionWhereInput = {
      assignment: { }};

    if (queryOptions.assignmentId) where.assignmentId = queryOptions.assignmentId;
    if (queryOptions.studentId) where.studentId = queryOptions.studentId;
    if (queryOptions.status) where.status = queryOptions.status;

    const itemCount = await this.prisma.assignmentSubmission.count({ where });

    const submissions = await this.prisma.assignmentSubmission.findMany({
      where,
      include: {
        student: { include: { user: { select: { firstName: true, lastName: true } } } },
        assignment: { select: { title: true, maxMarks: true } },
        gradedBy: { include: { user: { select: { firstName: true, lastName: true } } } }},
      orderBy: { submittedAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });

    return new PageDto(submissions, pageMetaDto);
  }

  async findOne(id: string) {
    const submission = await this.prisma.assignmentSubmission.findUnique({
      where: { id },
      include: {
        student: {
          include: { user: { select: { firstName: true, lastName: true, email: true } } }},
        assignment: true,
        gradedBy: { include: { user: { select: { firstName: true, lastName: true } } } }}});

    if (!submission) {
      throw new NotFoundException(`Submission not found`);
    }

    return submission;
  }
}
