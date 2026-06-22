import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateStaffLoanDto,
  StaffLoanQueryOptionsDto,
  UpdateStaffLoanDto} from '../../dto/staff-loan.dto';

@Injectable()
export class StaffLoansService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createDto: CreateStaffLoanDto) {
    const staff = await this.prisma.staff.findUnique({
      where: { id: createDto.staffId }});

    if (!staff ) {
      throw new NotFoundException('Staff not found');
    }

    return this.prisma.staffLoan.create({
      data: {
        ...createDto,
        remainingAmount: createDto.amount, // initially, remaining is full amount
        
      }});
  }

  async findAll( queryOptions: StaffLoanQueryOptionsDto) {
    const where: Prisma.StaffLoanWhereInput = {
      
    };

    if (queryOptions.staffId) {
      where.staffId = queryOptions.staffId;
    }

    if (queryOptions.status) {
      where.status = queryOptions.status;
    }

    const itemCount = await this.prisma.staffLoan.count({ where });

    const loans = await this.prisma.staffLoan.findMany({
      where,
      orderBy: { issueDate: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        staff: { include: { user: { select: { firstName: true, lastName: true } } } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(loans, pageMetaDto);
  }

  async findOne(id: string, ) {
    const loan = await this.prisma.staffLoan.findFirst({
      where: { id},
      include: {
        staff: { include: { user: { select: { firstName: true, lastName: true } } } }}});

    if (!loan) {
      throw new NotFoundException('Staff Loan not found');
    }

    return loan;
  }

  async update(id: string,  updateDto: UpdateStaffLoanDto) {
    await this.findOne(id, );

    // If staffId changes, make sure staff exists
    if (updateDto.staffId) {
      const staff = await this.prisma.staff.findUnique({
        where: { id: updateDto.staffId }});

      if (!staff ) {
        throw new NotFoundException('Staff not found');
      }
    }

    return this.prisma.staffLoan.update({
      where: { id },
      data: updateDto});
  }

  async remove(id: string, ) {
    await this.findOne(id, );

    return this.prisma.staffLoan.delete({
      where: { id }});
  }
}
