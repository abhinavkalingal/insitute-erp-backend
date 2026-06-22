import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateSalaryStructureDto,
  SalaryComponentDto,
  SalaryStructureQueryOptionsDto,
  UpdateSalaryStructureDto} from '../../dto/salary-structure.dto';

@Injectable()
export class SalaryStructuresService {
  constructor(private readonly prisma: PrismaService) {}

  private calculateNetSalary(
    basicPay: number,
    allowances?: SalaryComponentDto[],
    deductions?: SalaryComponentDto[],
  ): number {
    let net = basicPay;

    if (allowances && allowances.length > 0) {
      net += allowances.reduce((sum, item) => sum + item.amount, 0);
    }

    if (deductions && deductions.length > 0) {
      net -= deductions.reduce((sum, item) => sum + item.amount, 0);
    }

    return Math.max(0, net);
  }

  async create( createDto: CreateSalaryStructureDto) {
    const existing = await this.prisma.salaryStructure.findUnique({
      where: { staffId: createDto.staffId }});

    if (existing) {
      throw new ConflictException('Salary structure already exists for this staff member');
    }

    const staff = await this.prisma.staff.findUnique({
      where: { id: createDto.staffId }});

    if (!staff ) {
      throw new NotFoundException('Staff not found');
    }

    const netSalary = this.calculateNetSalary(
      createDto.basicPay,
      createDto.allowances,
      createDto.deductions,
    );

    return this.prisma.salaryStructure.create({
      data: {
        
        staffId: createDto.staffId,
        basicPay: createDto.basicPay,
        allowances: createDto.allowances ? (createDto.allowances as any) : Prisma.JsonNull,
        deductions: createDto.deductions ? (createDto.deductions as any) : Prisma.JsonNull,
        netSalary}});
  }

  async findAll( queryOptions: SalaryStructureQueryOptionsDto) {
    const where: Prisma.SalaryStructureWhereInput = {
      
    };

    if (queryOptions.staffId) {
      where.staffId = queryOptions.staffId;
    }

    const itemCount = await this.prisma.salaryStructure.count({ where });

    const structures = await this.prisma.salaryStructure.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        staff: { include: { user: { select: { firstName: true, lastName: true } } } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(structures, pageMetaDto);
  }

  async findOne(id: string, ) {
    const structure = await this.prisma.salaryStructure.findFirst({
      where: { id},
      include: {
        staff: { include: { user: { select: { firstName: true, lastName: true } } } }}});

    if (!structure) {
      throw new NotFoundException('Salary Structure not found');
    }

    return structure;
  }

  async update(id: string,  updateDto: UpdateSalaryStructureDto) {
    const existing = await this.findOne(id, );

    const basicPay = updateDto.basicPay !== undefined ? updateDto.basicPay : existing.basicPay;
    const allowances =
      updateDto.allowances !== undefined
        ? updateDto.allowances
        : (existing.allowances as unknown as SalaryComponentDto[]);
    const deductions =
      updateDto.deductions !== undefined
        ? updateDto.deductions
        : (existing.deductions as unknown as SalaryComponentDto[]);

    const netSalary = this.calculateNetSalary(basicPay, allowances, deductions);

    const updateData: Prisma.SalaryStructureUpdateInput = {
      netSalary};

    if (updateDto.basicPay !== undefined) updateData.basicPay = updateDto.basicPay;
    if (updateDto.allowances !== undefined)
      updateData.allowances = updateDto.allowances
        ? (updateDto.allowances as any)
        : Prisma.JsonNull;
    if (updateDto.deductions !== undefined)
      updateData.deductions = updateDto.deductions
        ? (updateDto.deductions as any)
        : Prisma.JsonNull;

    return this.prisma.salaryStructure.update({
      where: { id },
      data: updateData});
  }

  async remove(id: string, ) {
    await this.findOne(id, );

    return this.prisma.salaryStructure.delete({
      where: { id }});
  }
}
