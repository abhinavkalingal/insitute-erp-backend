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

import { CreateStudentDto } from './dto/create-student.dto';
import { LinkGuardianDto } from './dto/link-guardian.dto';
import { StudentQueryOptionsDto } from './dto/student-query-options.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create( createStudentDto: CreateStudentDto) {
    const {
      email,
      password,
      firstName,
      lastName,
      branchId,
      enrollmentNo,
      batchId,
      courseId,
      admissionDate,
      profile} = createStudentDto;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    if (enrollmentNo) {
      const existingStudent = await this.prisma.student.findFirst({
        where: { enrollmentNo}});
      if (existingStudent) {
        throw new ConflictException(`Enrollment number ${enrollmentNo} already exists`);
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          firstName,
          lastName,
          
          isEmailVerified: true}});

      const parsedAdmissionDate = admissionDate ? new Date(admissionDate) : null;

      const student = await tx.student.create({
        data: {
          userId: user.id,
          
          branchId,
          enrollmentNo,
          batchId,
          courseId,
          admissionDate: parsedAdmissionDate,
          profile: profile as Prisma.InputJsonValue | undefined},
        include: {
          user: true}});

      return student;
    });
  }

  async findAll( queryOptions: StudentQueryOptionsDto) {
    const where: Prisma.StudentWhereInput = {
      
      deletedAt: null};

    if (queryOptions.courseId) where.courseId = queryOptions.courseId;
    if (queryOptions.batchId) where.batchId = queryOptions.batchId;
    if (queryOptions.branchId) where.branchId = queryOptions.branchId;
    if (queryOptions.status) where.status = queryOptions.status;

    if (queryOptions.search) {
      where.OR = [
        { enrollmentNo: { contains: queryOptions.search, mode: 'insensitive' } },
        { user: { firstName: { contains: queryOptions.search, mode: 'insensitive' } } },
        { user: { lastName: { contains: queryOptions.search, mode: 'insensitive' } } },
        { user: { email: { contains: queryOptions.search, mode: 'insensitive' } } },
      ];
    }

    const itemCount = await this.prisma.student.count({ where });

    const students = await this.prisma.student.findMany({
      where,
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true, isActive: true }},
        branch: { select: { id: true, name: true } },
        guardians: {
          include: {
            guardian: {
              include: { user: { select: { firstName: true, lastName: true, email: true } } }}}}},
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(students, pageMetaDto);
  }

  async findOne(id: string, ) {
    const student = await this.prisma.student.findFirst({
      where: { id},
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true, isActive: true }},
        branch: { select: { id: true, name: true } },
        guardians: {
          include: {
            guardian: {
              include: { user: { select: { firstName: true, lastName: true, email: true } } }}}}}});

    if (!student || student.deletedAt) {
      throw new NotFoundException(`Student not found`);
    }

    return student;
  }

  async update(id: string,  updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id, );

    const {
      email,
      firstName,
      lastName,
      branchId,
      enrollmentNo,
      batchId,
      courseId,
      admissionDate,
      profile} = updateStudentDto;

    if (enrollmentNo && enrollmentNo !== student.enrollmentNo) {
      const existing = await this.prisma.student.findFirst({
        where: { enrollmentNo}});
      if (existing) throw new ConflictException(`Enrollment No ${enrollmentNo} already in use`);
    }

    return this.prisma.$transaction(async (tx) => {
      if (email || firstName || lastName) {
        if (email && email !== student.user.email) {
          const userWithEmail = await tx.user.findUnique({ where: { email } });
          if (userWithEmail) throw new ConflictException('Email already in use');
        }

        await tx.user.update({
          where: { id: student.userId },
          data: { email, firstName, lastName }});
      }

      const updatedProfile = profile
        ? { ...(student.profile as Record<string, any>), ...profile }
        : undefined;
      const parsedAdmissionDate =
        admissionDate !== undefined ? (admissionDate ? new Date(admissionDate) : null) : undefined;

      const updatedStudent = await tx.student.update({
        where: { id },
        data: {
          branchId,
          enrollmentNo,
          batchId,
          courseId,
          ...(parsedAdmissionDate !== undefined && { admissionDate: parsedAdmissionDate }),
          ...(profile && { profile: updatedProfile })},
        include: {
          user: { select: { firstName: true, lastName: true, email: true } }}});

      return updatedStudent;
    });
  }

  async linkGuardian(id: string,  linkDto: LinkGuardianDto) {
    const student = await this.findOne(id, );

    return this.prisma.$transaction(async (tx) => {
      let finalGuardianId = linkDto.guardianId;

      // If no existing guardian ID is provided, create a new User + Guardian
      if (!finalGuardianId) {
        if (!linkDto.email || !linkDto.password || !linkDto.firstName) {
          throw new BadRequestException(
            'Email, password, and firstName are required to create a new guardian',
          );
        }

        const existingUser = await tx.user.findUnique({ where: { email: linkDto.email } });
        if (existingUser) {
          throw new ConflictException('Email already in use for a new guardian');
        }

        const hashedPassword = await bcrypt.hash(linkDto.password, 10);
        const newUser = await tx.user.create({
          data: {
            email: linkDto.email,
            passwordHash: hashedPassword,
            firstName: linkDto.firstName,
            lastName: linkDto.lastName,
            
            isEmailVerified: true}});

        const newGuardian = await tx.guardian.create({
          data: {
            userId: newUser.id,
            
            profile: linkDto.profile as Prisma.InputJsonValue | undefined}});

        finalGuardianId = newGuardian.id;
      } else {
        // Validate existing guardian
        const existingGuardian = await tx.guardian.findFirst({
          where: { id: finalGuardianId}});
        if (!existingGuardian) {
          throw new NotFoundException(`Guardian with ID ${finalGuardianId} not found`);
        }
      }

      // Link them in junction table
      const link = await tx.studentGuardian.upsert({
        where: {
          studentId_guardianId: {
            studentId: student.id,
            guardianId: finalGuardianId}},
        update: {
          relationship: linkDto.relationship,
          isPrimary: linkDto.isPrimary ?? false},
        create: {
          studentId: student.id,
          guardianId: finalGuardianId,
          relationship: linkDto.relationship,
          isPrimary: linkDto.isPrimary ?? false}});

      return { message: 'Guardian linked successfully', link };
    });
  }

  async uploadDocument(
    id: string,
    
    documentUrl: string,
    originalName: string,
    mimetype: string,
  ) {
    const student = await this.findOne(id, );

    const existingDocs = (student.documents as any[]) || [];
    const newDoc = {
      url: documentUrl,
      name: originalName,
      type: mimetype,
      uploadedAt: new Date().toISOString()};

    return this.prisma.student.update({
      where: { id },
      data: {
        documents: [...existingDocs, newDoc] as Prisma.InputJsonArray}});
  }

  async remove(id: string, ) {
    const student = await this.findOne(id, );

    return this.prisma.$transaction(async (tx) => {
      await tx.student.update({
        where: { id },
        data: { deletedAt: new Date(), status: 'TERMINATED' }, // Or DROPOUT
      });

      await tx.user.update({
        where: { id: student.userId },
        data: { deletedAt: new Date(), isActive: false }});

      return { message: 'Student and associated User soft-deleted successfully' };
    });
  }
}
