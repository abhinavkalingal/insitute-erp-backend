import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  ParticipantQueryOptionsDto,
  RegisterParticipantDto} from '../../dto/register-participant.dto';

@Injectable()
export class EventParticipantsService {
  constructor(private readonly prisma: PrismaService) {}

  async register( registerDto: RegisterParticipantDto) {
    // 1. Verify Event exists and belongs to institute
    const event = await this.prisma.event.findUnique({
      where: { id: registerDto.eventId },
      include: {
        _count: {
          select: { participants: { where: { status: 'CONFIRMED' } } }}}});

    if (!event ) {
      throw new NotFoundException('Event not found');
    }

    if (!event.isRegistrationRequired) {
      throw new BadRequestException('This event does not require registration');
    }

    if (event.status === 'CANCELLED' || event.status === 'COMPLETED') {
      throw new ConflictException(`Cannot register. Event is ${event.status}`);
    }

    // 2. Capacity Check
    if (event.maxParticipants !== null) {
      const currentCount = event._count.participants;
      if (currentCount >= event.maxParticipants) {
        throw new ConflictException('Event registration is full');
      }
    }

    // 3. Validation of internal vs guest
    const studentId = registerDto.studentId;
    const staffId = registerDto.staffId;

    if (studentId) {
      const student = await this.prisma.student.findUnique({ where: { id: studentId } });
      if (!student )
        throw new NotFoundException('Student not found');
    } else if (staffId) {
      const staff = await this.prisma.staff.findUnique({ where: { id: staffId } });
      if (!staff )
        throw new NotFoundException('Staff not found');
    } else if (!registerDto.guestName) {
      throw new BadRequestException('Must provide either studentId, staffId, or guestName');
    }

    // 4. Duplicate Check
    if (studentId || staffId) {
      const existing = await this.prisma.eventParticipant.findFirst({
        where: {
          eventId: registerDto.eventId,
          OR: [{ studentId: studentId || undefined }, { staffId: staffId || undefined }],
          status: 'CONFIRMED'}});
      if (existing) {
        throw new ConflictException('You are already registered for this event');
      }
    }

    // 5. Register
    return this.prisma.eventParticipant.create({
      data: {
        eventId: registerDto.eventId,
        studentId,
        staffId,
        guestName: registerDto.guestName,
        guestEmail: registerDto.guestEmail}});
  }

  async findAll( queryOptions: ParticipantQueryOptionsDto) {
    // Only return participants for events belonging to this institute
    const where: Prisma.EventParticipantWhereInput = {
      event: { }};

    if (queryOptions.eventId) {
      where.eventId = queryOptions.eventId;
    }

    const itemCount = await this.prisma.eventParticipant.count({ where });

    const participants = await this.prisma.eventParticipant.findMany({
      where,
      orderBy: { registrationDate: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        event: { select: { title: true } },
        student: { include: { user: { select: { firstName: true, lastName: true } } } },
        staff: { include: { user: { select: { firstName: true, lastName: true } } } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(participants, pageMetaDto);
  }

  async cancelRegistration(id: string, ) {
    const participant = await this.prisma.eventParticipant.findFirst({
      where: { id, event: { } }});

    if (!participant) {
      throw new NotFoundException('Participant registration not found');
    }

    return this.prisma.eventParticipant.update({
      where: { id },
      data: { status: 'CANCELLED' }});
  }
}
