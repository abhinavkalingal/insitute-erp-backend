import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ResultQueryOptionsDto } from '../../dto/result-query-options.dto';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  async generateResultsForTerm( examTermId: string) {
    // 1. Verify the ExamTerm exists and is published
    const term = await this.prisma.examTerm.findUnique({
      where: { id: examTermId }});

    if (!term) {
      throw new NotFoundException('Exam Term not found');
    }

    if (!term.isPublished) {
      throw new BadRequestException('Cannot generate results until the Exam Term is published.');
    }

    // 2. Get all grade rules for the institute to calculate GPA
    const gradeRules = await this.prisma.gradeRule.findMany({
      where: { },
      orderBy: { minPercent: 'desc' }});

    // 3. Get all exams and marks for this term
    const exams = await this.prisma.exam.findMany({
      where: { examTermId },
      include: {
        marks: true}});

    if (exams.length === 0) {
      throw new BadRequestException('No exams found for this term.');
    }

    // 4. Aggregate data per student
    const studentAggregations: Record<
      string,
      { totalObtained: number; totalMax: number; pointsSum: number; examCount: number }
    > = {};

    for (const exam of exams) {
      for (const mark of exam.marks) {
        if (!studentAggregations[mark.studentId]) {
          studentAggregations[mark.studentId] = {
            totalObtained: 0,
            totalMax: 0,
            pointsSum: 0,
            examCount: 0};
        }

        const studentAgg = studentAggregations[mark.studentId];

        // Treat absent or null marks as 0
        const obtained = mark.isAbsent || mark.marksObtained === null ? 0 : mark.marksObtained;
        studentAgg.totalObtained += obtained;
        studentAgg.totalMax += exam.maxMarks;

        // Calculate GPA for this specific exam based on percentage
        const percent = (obtained / exam.maxMarks) * 100;
        const matchedRule = gradeRules.find(
          (r) => percent >= r.minPercent && percent <= r.maxPercent,
        );

        if (matchedRule) {
          studentAgg.pointsSum += matchedRule.gradePoint;
        }
        studentAgg.examCount += 1;
      }
    }

    // 5. Calculate final stats and prepare array for ranking
    const finalResults: {
      studentId: string;
      totalMarksObtained: number;
      totalMaxMarks: number;
      percentage: number;
      gradePointAverage: number;
    }[] = [];

    for (const [studentId, agg] of Object.entries(studentAggregations)) {
      const percentage = agg.totalMax > 0 ? (agg.totalObtained / agg.totalMax) * 100 : 0;
      const gpa = agg.examCount > 0 ? agg.pointsSum / agg.examCount : 0;

      finalResults.push({
        studentId,
        totalMarksObtained: agg.totalObtained,
        totalMaxMarks: agg.totalMax,
        percentage: Number(percentage.toFixed(2)),
        gradePointAverage: Number(gpa.toFixed(2))});
    }

    // 6. Sort by percentage descending to determine rank
    finalResults.sort((a, b) => b.percentage - a.percentage);

    // 7. Upsert results into database
    await this.prisma.$transaction(
      finalResults.map((res, index) => {
        return this.prisma.studentResult.upsert({
          where: {
            examTermId_studentId: {
              examTermId,
              studentId: res.studentId}},
          create: {
            
            examTermId,
            studentId: res.studentId,
            totalMarksObtained: res.totalMarksObtained,
            totalMaxMarks: res.totalMaxMarks,
            percentage: res.percentage,
            gradePointAverage: res.gradePointAverage,
            rank: index + 1, // Rank is simply the index + 1 after sorting
          },
          update: {
            totalMarksObtained: res.totalMarksObtained,
            totalMaxMarks: res.totalMaxMarks,
            percentage: res.percentage,
            gradePointAverage: res.gradePointAverage,
            rank: index + 1}});
      }),
    );

    return {
      message: `Results generated for ${finalResults.length} students.`,
      totalProcessed: finalResults.length};
  }

  async getRankings( examTermId: string, queryOptions: ResultQueryOptionsDto) {
    const where: Prisma.StudentResultWhereInput = {
      
      examTermId};

    const itemCount = await this.prisma.studentResult.count({ where });

    const rankings = await this.prisma.studentResult.findMany({
      where,
      include: {
        student: { include: { user: { select: { firstName: true, lastName: true } } } }},
      orderBy: { rank: 'asc' }, // Rank 1 is best
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(rankings, pageMetaDto);
  }

  async getMarkSheet( examTermId: string, studentId: string) {
    const result = await this.prisma.studentResult.findUnique({
      where: {
        examTermId_studentId: { examTermId, studentId }},
      include: {
        student: {
          include: { user: { select: { firstName: true, lastName: true, email: true } } }},
        term: true}});

    if (!result) {
      throw new NotFoundException('Result not generated yet for this student');
    }

    // Get individual marks for the sheet
    const marks = await this.prisma.examMark.findMany({
      where: {
        studentId,
        exam: { examTermId }},
      include: {
        exam: {
          select: {
            date: true,
            maxMarks: true,
            passingMarks: true,
            subject: { select: { name: true, code: true } }}}}});

    return {
      summary: result,
      details: marks};
  }
}
