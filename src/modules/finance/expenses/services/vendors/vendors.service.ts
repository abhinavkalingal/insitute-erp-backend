import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateVendorDto, UpdateVendorDto, VendorQueryOptionsDto } from '../../dto/vendor.dto';

@Injectable()
export class VendorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateVendorDto) {
    return this.prisma.vendor.create({
      data: {
        ...createDto}});
  }

  async findAll( queryOptions: VendorQueryOptionsDto) {
    const where: Prisma.VendorWhereInput = {
      
    };

    if (queryOptions.search) {
      where.OR = [
        { name: { contains: queryOptions.search, mode: 'insensitive' } },
        { contactName: { contains: queryOptions.search, mode: 'insensitive' } },
        { email: { contains: queryOptions.search, mode: 'insensitive' } },
      ];
    }

    const itemCount = await this.prisma.vendor.count({ where });

    const vendors = await this.prisma.vendor.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(vendors, pageMetaDto);
  }

  async findOne(id: string, ) {
    const vendor = await this.prisma.vendor.findFirst({
      where: { id}});

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    return vendor;
  }

  async update(id: string,  updateDto: UpdateVendorDto) {
    await this.findOne(id, );

    return this.prisma.vendor.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, );

    return this.prisma.vendor.delete({
      where: { id }});
  }
}
