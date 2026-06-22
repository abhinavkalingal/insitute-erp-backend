import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { AttendanceQueryOptionsDto } from './dto/attendance-query-options.dto';
import { AttendanceType, MarkAttendanceDto } from './dto/mark-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async markAttendance( takenById: string, dto: MarkAttendanceDto) {
    if (dto.type === AttendanceType.STUDENT && !dto.batchId) {
      throw new BadRequestException('batchId is required for STUDENT attendance');
    }

    const parsedDate = new Date(dto.date);
    // Strip time to just YYYY-MM-DD UTC for exact match
    const dateOnly = new Date(
      Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate()),
    );

    return this.prisma.$transaction(async (tx) => {
      // Find or create the parent Attendance sheet
      let attendanceSheet = await tx.attendance.findFirst({
        where: {
          
          date: dateOnly,
          type: dto.type,
          ...(dto.batchId && { batchId: dto.batchId }),
          ...(dto.branchId && { branchId: dto.branchId })}});

      if (!attendanceSheet) {
        attendanceSheet = await tx.attendance.create({
          data: {
            
            takenById,
            date: dateOnly,
            type: dto.type,
            batchId: dto.batchId,
            branchId: dto.branchId}});
      } else {
        // Optionally update who took it last
        await tx.attendance.update({
          where: { id: attendanceSheet.id },
          data: { takenById }});
      }

      // Upsert records
      for (const record of dto.records) {
        if (dto.type === AttendanceType.STUDENT && !record.studentId) {
          throw new BadRequestException('studentId is required in records for STUDENT attendance');
        }
        if (dto.type === AttendanceType.STAFF && !record.staffId) {
          throw new BadRequestException('staffId is required in records for STAFF attendance');
        }

        const identifierCondition =
          dto.type === AttendanceType.STUDENT
            ? {
                attendanceId_studentId: {
                  attendanceId: attendanceSheet.id,
                  studentId: record.studentId!}}
            : {
                attendanceId_staffId: {
                  attendanceId: attendanceSheet.id,
                  staffId: record.staffId!}};

        await tx.attendanceRecord.upsert({
          where: identifierCondition,
          update: {
            status: record.status,
            remarks: record.remarks},
          create: {
            attendanceId: attendanceSheet.id,
            studentId: record.studentId,
            staffId: record.staffId,
            status: record.status,
            remarks: record.remarks}});
      }

      return this.findOne(attendanceSheet.id,  tx);
    });
  }

  async findAll( queryOptions: AttendanceQueryOptionsDto) {
    const where: Prisma.AttendanceWhereInput = {
      
    };

    if (queryOptions.date) {
      const parsedDate = new Date(queryOptions.date);
      where.date = new Date(
        Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate()),
      );
    } else if (queryOptions.startDate && queryOptions.endDate) {
      where.date = {
        gte: new Date(queryOptions.startDate),
        lte: new Date(queryOptions.endDate)};
    }

    if (queryOptions.type) where.type = queryOptions.type;
    if (queryOptions.batchId) where.batchId = queryOptions.batchId;
    if (queryOptions.branchId) where.branchId = queryOptions.branchId;

    const itemCount = await this.prisma.attendance.count({ where });

    const attendances = await this.prisma.attendance.findMany({
      where,
      include: {
        batch: { select: { name: true, course: { select: { name: true } } } },
        takenBy: { select: { firstName: true, lastName: true } },
        _count: { select: { records: true } }},
      orderBy: { date: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(attendances, pageMetaDto);
  }

  async findOne(id: string,  tx: any = this.prisma) {
    const attendance = await tx.attendance.findFirst({
      where: { id},
      include: {
        records: {
          include: {
            student: {
              include: { user: { select: { firstName: true, lastName: true, email: true } } }},
            staff: {
              include: { user: { select: { firstName: true, lastName: true, email: true } } }}}},
        batch: { select: { name: true, course: { select: { name: true } } } },
        takenBy: { select: { firstName: true, lastName: true } }}});

    if (!attendance) {
      throw new NotFoundException(`Attendance sheet not found`);
    }

    return attendance;
  }

  async getStudentHistory(
    studentId: string,
    
    queryOptions: AttendanceQueryOptionsDto,
  ) {
    // Make sure student belongs to institute
    const student = await this.prisma.student.findFirst({ where: { id: studentId} });
    if (!student) throw new NotFoundException('Student not found');

    const where: Prisma.AttendanceRecordWhereInput = {
      studentId,
      attendance: { }};

    if (queryOptions.startDate && queryOptions.endDate) {
      where.attendance = {
        
        date: {
          gte: new Date(queryOptions.startDate),
          lte: new Date(queryOptions.endDate)}};
    }

    const records = await this.prisma.attendanceRecord.findMany({
      where,
      include: {
        attendance: { select: { date: true, type: true } }},
      orderBy: { attendance: { date: 'desc' } }});

    return records;
  }
}
