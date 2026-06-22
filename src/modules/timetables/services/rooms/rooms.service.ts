import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateRoomDto, RoomQueryOptionsDto, UpdateRoomDto } from '../../dto/room.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateRoomDto) {
    return this.prisma.room.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: RoomQueryOptionsDto) {
    const where: Prisma.RoomWhereInput = {
      
      deletedAt: null};

    if (queryOptions.branchId) {
      where.branchId = queryOptions.branchId;
    }

    if (queryOptions.search) {
      where.name = { contains: queryOptions.search, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.room.count({ where });

    const rooms = await this.prisma.room.findMany({
      where,
      include: {
        branch: { select: { name: true } }},
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });

    return new PageDto(rooms, pageMetaDto);
  }

  async findOne(id: string, ) {
    const room = await this.prisma.room.findFirst({
      where: { id,  deletedAt: null },
      include: {
        branch: { select: { name: true } }}});

    if (!room) {
      throw new NotFoundException(`Room not found`);
    }

    return room;
  }

  async update(id: string,  updateDto: UpdateRoomDto) {
    await this.findOne(id, ); // Ensure exists

    return this.prisma.room.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, ); // Ensure exists

    // Soft delete
    return this.prisma.room.update({
      where: { id },
      data: { deletedAt: new Date() }});
  }
}
