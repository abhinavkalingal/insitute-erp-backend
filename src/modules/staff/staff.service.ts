import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffQueryOptionsDto } from './dto/staff-query-options.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createStaffDto: CreateStaffDto) {
    const {
      email,
      password,
      firstName,
      lastName,
      branchId,
      employeeId,
      department,
      designation,
      joiningDate,
      profile} = createStaffDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    if (employeeId) {
      const existingStaff = await this.prisma.staff.findFirst({
        where: { employeeId}});
      if (existingStaff) {
        throw new ConflictException(`Employee ID ${employeeId} already exists in this institute`);
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Default assigning 'Staff' role logic could go here if we dynamically look up the role by name.
    // For now, we will just create the user without attaching a specific system role.
    // In production, you might look up the "Staff" role for this and attach it.

    // We use a transaction to ensure both User and Staff records are created or both fail
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          firstName,
          lastName,
          
          isEmailVerified: true, // Auto-verify for internal staff creation
        }});

      const parsedJoiningDate = joiningDate ? new Date(joiningDate) : null;

      const staff = await tx.staff.create({
        data: {
          userId: user.id,
          
          branchId,
          employeeId,
          department,
          designation,
          joiningDate: parsedJoiningDate,
          profile: profile as Prisma.InputJsonValue | undefined},
        include: {
          user: true, // Return joined user data
        }});

      return staff;
    });
  }

  async findAll( queryOptions: StaffQueryOptionsDto) {
    const where: Prisma.StaffWhereInput = {
      
      deletedAt: null};

    if (queryOptions.department) {
      where.department = queryOptions.department;
    }

    if (queryOptions.branchId) {
      where.branchId = queryOptions.branchId;
    }

    if (queryOptions.status) {
      where.status = queryOptions.status;
    }

    if (queryOptions.search) {
      where.OR = [
        { employeeId: { contains: queryOptions.search, mode: 'insensitive' } },
        { user: { firstName: { contains: queryOptions.search, mode: 'insensitive' } } },
        { user: { lastName: { contains: queryOptions.search, mode: 'insensitive' } } },
        { user: { email: { contains: queryOptions.search, mode: 'insensitive' } } },
      ];
    }

    const itemCount = await this.prisma.staff.count({ where });

    const staffList = await this.prisma.staff.findMany({
      where,
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true, isActive: true }},
        branch: {
          select: { id: true, name: true }}},
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });

    return new PageDto(staffList, pageMetaDto);
  }

  async findOne(id: string, ) {
    const staff = await this.prisma.staff.findFirst({
      where: { id},
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true, isActive: true }},
        branch: {
          select: { id: true, name: true }}}});

    if (!staff || staff.deletedAt) {
      throw new NotFoundException(`Staff member not found`);
    }

    return staff;
  }

  async update(id: string,  updateStaffDto: UpdateStaffDto) {
    const staff = await this.findOne(id, );

    const {
      email,
      firstName,
      lastName,
      branchId,
      employeeId,
      department,
      designation,
      joiningDate,
      profile} = updateStaffDto;

    // Check if another staff uses this employeeId
    if (employeeId && employeeId !== staff.employeeId) {
      const existing = await this.prisma.staff.findFirst({ where: { employeeId} });
      if (existing) {
        throw new ConflictException(`Employee ID ${employeeId} already in use`);
      }
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Update User Record if needed
      if (email || firstName || lastName) {
        if (email && email !== staff.user.email) {
          const userWithEmail = await tx.user.findUnique({ where: { email } });
          if (userWithEmail) throw new ConflictException('Email already in use');
        }

        await tx.user.update({
          where: { id: staff.userId },
          data: { email, firstName, lastName }});
      }

      // 2. Deep Merge Profile JSON
      const updatedProfile = profile
        ? { ...(staff.profile as Record<string, any>), ...profile }
        : undefined;
      const parsedJoiningDate =
        joiningDate !== undefined ? (joiningDate ? new Date(joiningDate) : null) : undefined;

      // 3. Update Staff Record
      const updatedStaff = await tx.staff.update({
        where: { id },
        data: {
          branchId,
          employeeId,
          department,
          designation,
          ...(parsedJoiningDate !== undefined && { joiningDate: parsedJoiningDate }),
          ...(profile && { profile: updatedProfile })},
        include: {
          user: { select: { firstName: true, lastName: true, email: true } }}});

      return updatedStaff;
    });
  }

  async uploadDocument(
    id: string,
    
    documentUrl: string,
    originalName: string,
    mimetype: string,
  ) {
    const staff = await this.findOne(id, );

    const existingDocs = (staff.documents as any[]) || [];
    const newDoc = {
      url: documentUrl,
      name: originalName,
      type: mimetype,
      uploadedAt: new Date().toISOString()};

    return this.prisma.staff.update({
      where: { id },
      data: {
        documents: [...existingDocs, newDoc] as Prisma.InputJsonArray}});
  }

  async remove(id: string, ) {
    const staff = await this.findOne(id, );

    return this.prisma.$transaction(async (tx) => {
      // Soft delete staff
      await tx.staff.update({
        where: { id },
        data: { deletedAt: new Date(), status: 'TERMINATED' }});

      // Soft delete associated user to block login
      await tx.user.update({
        where: { id: staff.userId },
        data: { deletedAt: new Date(), isActive: false }});

      return { message: 'Staff and associated User soft-deleted successfully' };
    });
  }
}
