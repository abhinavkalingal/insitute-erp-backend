import { SaasEnforcementService } from '@core/services/saas-enforcement.service';
import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { BranchQueryOptionsDto } from './dto/branch-query-options.dto';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly saasEnforcement: SaasEnforcementService,
  ) {}

  async create(instituteId: string, createBranchDto: CreateBranchDto) {
    // Check SaaS Limits
    const currentBranchesCount = await this.prisma.branch.count({
      where: {  deletedAt: null }});

    await this.saasEnforcement.checkLimit(instituteId, 'MAX_BRANCHES', currentBranchesCount);

    const { address, settings, ...rest } = createBranchDto;

    return this.prisma.branch.create({
      data: {
        ...rest,
        
        address: address as Prisma.InputJsonValue | undefined,
        settings: settings as Prisma.InputJsonValue | undefined}});
  }

  async findAll( queryOptions: BranchQueryOptionsDto) {
    const where: Prisma.BranchWhereInput = {
      
      deletedAt: null};

    if (queryOptions.isActive !== undefined) {
      where.isActive = queryOptions.isActive === 'true';
    }

    if (queryOptions.search) {
      where.OR = [{ name: { contains: queryOptions.search, mode: 'insensitive' } }];
    }

    const itemCount = await this.prisma.branch.count({ where });

    const branches = await this.prisma.branch.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });

    return new PageDto(branches, pageMetaDto);
  }

  async findOne(id: string, ) {
    const branch = await this.prisma.branch.findFirst({
      where: { id}});

    if (!branch || branch.deletedAt) {
      throw new NotFoundException(`Branch with ID ${id} not found in your institute`);
    }
    return branch;
  }

  async update(id: string,  updateBranchDto: UpdateBranchDto) {
    await this.findOne(id, ); // Ensure exists and belongs to institute

    const { address, settings, ...rest } = updateBranchDto;

    // Fetch existing branch to merge JSON objects correctly
    const currentBranch = await this.prisma.branch.findUnique({ where: { id } });

    const updatedAddress = address
      ? { ...(currentBranch?.address as Record<string, any>), ...address }
      : undefined;
    const updatedSettings = settings
      ? { ...(currentBranch?.settings as Record<string, any>), ...settings }
      : undefined;

    return this.prisma.branch.update({
      where: { id },
      data: {
        ...rest,
        ...(address && { address: updatedAddress }),
        ...(settings && { settings: updatedSettings })}});
  }

  async remove(id: string, ) {
    await this.findOne(id, );

    // Soft delete
    await this.prisma.branch.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false }});

    return { message: 'Branch soft-deleted successfully' };
  }
}
