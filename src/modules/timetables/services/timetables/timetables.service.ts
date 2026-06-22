import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateTimetableDto,
  TimetableQueryOptionsDto,
  UpdateTimetableDto} from '../../dto/timetable.dto';

@Injectable()
export class TimetablesService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateTimetableDto) {
    const { periods, ...timetableData } = createDto;

    return this.prisma.$transaction(async (tx) => {
      // Create timetable parent
      const timetable = await tx.timetable.create({
        data: {
          ...timetableData}});

      // Insert periods
      if (periods && periods.length > 0) {
        await tx.timetablePeriod.createMany({
          data: periods.map((p) => ({
            timetableId: timetable.id,
            dayOfWeek: p.dayOfWeek,
            startTime: p.startTime,
            endTime: p.endTime,
            subjectId: p.subjectId,
            teacherId: p.teacherId,
            roomId: p.roomId}))});
      }

      return this.findOne(timetable.id,  tx);
    });
  }

  async findAll( queryOptions: TimetableQueryOptionsDto) {
    const where: Prisma.TimetableWhereInput = {
      
    };

    if (queryOptions.batchId) {
      where.batchId = queryOptions.batchId;
    }

    if (queryOptions.isActive !== undefined) {
      where.isActive = queryOptions.isActive === 'true';
    }

    const itemCount = await this.prisma.timetable.count({ where });

    const timetables = await this.prisma.timetable.findMany({
      where,
      include: {
        batch: { select: { name: true, course: { select: { name: true } } } },
        _count: { select: { periods: true } }},
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });

    return new PageDto(timetables, pageMetaDto);
  }

  async findOne(id: string,  tx: any = this.prisma) {
    const timetable = await tx.timetable.findFirst({
      where: { id},
      include: {
        batch: { select: { name: true, course: { select: { name: true } } } },
        periods: {
          include: {
            subject: { select: { name: true, code: true } },
            teacher: { include: { user: { select: { firstName: true, lastName: true } } } },
            room: { select: { name: true } }},
          orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }]}}});

    if (!timetable) {
      throw new NotFoundException(`Timetable not found`);
    }

    return timetable;
  }

  async update(id: string,  updateDto: UpdateTimetableDto) {
    await this.findOne(id, ); // Ensure exists

    const { periods, ...timetableData } = updateDto;

    return this.prisma.$transaction(async (tx) => {
      // Update primitive fields
      if (Object.keys(timetableData).length > 0) {
        await tx.timetable.update({
          where: { id },
          data: timetableData});
      }

      // Sync periods if provided
      if (periods) {
        await tx.timetablePeriod.deleteMany({
          where: { timetableId: id }});

        if (periods.length > 0) {
          await tx.timetablePeriod.createMany({
            data: periods.map((p) => ({
              timetableId: id,
              dayOfWeek: p.dayOfWeek,
              startTime: p.startTime,
              endTime: p.endTime,
              subjectId: p.subjectId,
              teacherId: p.teacherId,
              roomId: p.roomId}))});
        }
      }

      return this.findOne(id,  tx);
    });
  }

  async remove(id: string, ) {
    await this.findOne(id, ); // Ensure exists

    await this.prisma.timetable.delete({
      where: { id }});

    return { message: 'Timetable deleted successfully' };
  }

  async findTeacherSchedule(staffId: string, ) {
    // Only fetch periods belonging to active timetables within the institute
    const periods = await this.prisma.timetablePeriod.findMany({
      where: {
        teacherId: staffId,
        timetable: {
          
          isActive: true}},
      include: {
        timetable: {
          select: {
            name: true,
            batch: { select: { name: true, course: { select: { name: true } } } }}},
        subject: { select: { name: true, code: true } },
        room: { select: { name: true } }},
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }]});

    return periods;
  }
}
