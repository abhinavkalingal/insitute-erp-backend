import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateEventDto, EventQueryOptionsDto, UpdateEventDto } from '../../dto/event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateEventDto) {
    // Verify category belongs to institute
    const category = await this.prisma.eventCategory.findUnique({
      where: { id: createDto.categoryId }});

    if (!category ) {
      throw new NotFoundException('Event Category not found');
    }

    return this.prisma.event.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: EventQueryOptionsDto) {
    const where: Prisma.EventWhereInput = {
      
    };

    if (queryOptions.search) {
      where.title = { contains: queryOptions.search, mode: 'insensitive' };
    }

    if (queryOptions.categoryId) {
      where.categoryId = queryOptions.categoryId;
    }

    if (queryOptions.status) {
      where.status = queryOptions.status;
    }

    const itemCount = await this.prisma.event.count({ where });

    const events = await this.prisma.event.findMany({
      where,
      orderBy: { startDate: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        category: { select: { name: true } },
        _count: { select: { participants: true } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(events, pageMetaDto);
  }

  async findOne(id: string, ) {
    const event = await this.prisma.event.findFirst({
      where: { id},
      include: {
        category: { select: { name: true } },
        _count: { select: { participants: true } }}});

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async update(id: string,  updateDto: UpdateEventDto) {
    await this.findOne(id, ); // Ensure exists

    if (updateDto.categoryId) {
      const category = await this.prisma.eventCategory.findUnique({
        where: { id: updateDto.categoryId }});
      if (!category ) {
        throw new NotFoundException('Event Category not found');
      }
    }

    return this.prisma.event.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, ); // Ensure exists

    return this.prisma.event.delete({
      where: { id }});
  }
}
