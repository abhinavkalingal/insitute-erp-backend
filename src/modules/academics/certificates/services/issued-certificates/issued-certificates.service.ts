import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as crypto from 'crypto';

import {
  IssueCertificateDto,
  IssuedCertificateQueryOptionsDto} from '../../dto/issue-certificate.dto';

@Injectable()
export class IssuedCertificatesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Generates a unique Certificate ID (e.g. CERT-1A2B3C)
   */
  private generateCertificateNumber(): string {
    const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
    const year = new Date().getFullYear();
    return `CERT-${year}-${randomHex}`;
  }

  async issue( issueDto: IssueCertificateDto) {
    // 1. Verify template exists
    const template = await this.prisma.certificateTemplate.findUnique({
      where: { id: issueDto.templateId }});

    if (!template ) {
      throw new NotFoundException('Certificate template not found');
    }

    // 2. Verify student exists
    const student = await this.prisma.student.findUnique({
      where: { id: issueDto.studentId },
      include: { user: true }});

    if (!student ) {
      throw new NotFoundException('Student not found');
    }

    // 3. Check if already issued
    const existing = await this.prisma.issuedCertificate.findUnique({
      where: {
        templateId_studentId: {
          templateId: issueDto.templateId,
          studentId: issueDto.studentId}}});

    if (existing) {
      throw new ConflictException(
        'This certificate template has already been issued to this student.',
      );
    }

    // 4. Create Issued Record
    const certificateNumber = this.generateCertificateNumber();
    const issueDate = new Date();

    const issuedCert = await this.prisma.issuedCertificate.create({
      data: {
        
        templateId: issueDto.templateId,
        studentId: issueDto.studentId,
        certificateNumber,
        issueDate}});

    // 5. Render HTML
    const studentName = `${student.user.firstName} ${student.user.lastName}`.trim();
    let renderedHtml = template.contentHtml;

    // Simple string replacements
    renderedHtml = renderedHtml.replace(/\{\{studentName\}\}/g, studentName);
    renderedHtml = renderedHtml.replace(/\{\{studentEmail\}\}/g, student.user.email);
    renderedHtml = renderedHtml.replace(/\{\{issueDate\}\}/g, issueDate.toLocaleDateString());
    renderedHtml = renderedHtml.replace(/\{\{certificateNumber\}\}/g, certificateNumber);

    return {
      certificate: issuedCert,
      renderedHtml, // Frontend can render this into a PDF or Canvas
      backgroundUrl: template.backgroundUrl};
  }

  async findAll( queryOptions: IssuedCertificateQueryOptionsDto) {
    const where: Prisma.IssuedCertificateWhereInput = {
      
    };

    if (queryOptions.templateId) where.templateId = queryOptions.templateId;
    if (queryOptions.studentId) where.studentId = queryOptions.studentId;

    const itemCount = await this.prisma.issuedCertificate.count({ where });

    const certs = await this.prisma.issuedCertificate.findMany({
      where,
      orderBy: { issueDate: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        template: { select: { name: true } },
        student: { include: { user: { select: { firstName: true, lastName: true } } } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(certs, pageMetaDto);
  }

  /**
   * PUBLIC ENDPOINT: Verifies a certificate by its unique QR code number.
   * Does NOT require or authentication.
   */
  async verifyQrCode(certificateNumber: string) {
    const cert = await this.prisma.issuedCertificate.findUnique({
      where: { certificateNumber },
      include: {
        template: { select: { name: true } },
        student: {
          include: {
            user: { select: { firstName: true, lastName: true } },
            branch: { select: { name: true } },
          },
        },
      },
    });

    if (!cert) {
      throw new NotFoundException(
        'Invalid Certificate Number. This certificate does not exist in our records.',
      );
    }

    return {
      isValid: true,
      issuedBy: cert.student?.branch?.name || 'Institute',
      awardedTo: `${cert.student.user.firstName} ${cert.student.user.lastName}`,
      certificateName: cert.template?.name || 'Certificate',
      issueDate: cert.issueDate,
      certificateNumber: cert.certificateNumber};
  }
}
