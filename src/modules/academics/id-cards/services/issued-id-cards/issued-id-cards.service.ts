import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as crypto from 'crypto';

import { IssuedIdCardQueryOptionsDto, IssueIdCardDto } from '../../dto/issue-id-card.dto';

@Injectable()
export class IssuedIdCardsService {
  constructor(private readonly prisma: PrismaService) {}

  private generateCardNumber(): string {
    const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
    const year = new Date().getFullYear();
    return `IDC-${year}-${randomHex}`;
  }

  async issue( issueDto: IssueIdCardDto) {
    // 1. Verify template exists
    const template = await this.prisma.idCardTemplate.findUnique({
      where: { id: issueDto.templateId }});

    if (!template ) {
      throw new NotFoundException('ID Card template not found');
    }

    let finalHolderName = issueDto.holderName || '';

    // 2. Validate polymorphic relationships
    if (template.roleType === 'STUDENT') {
      if (!issueDto.studentId)
        throw new BadRequestException('studentId is required for STUDENT ID Cards');
      const student = await this.prisma.student.findUnique({
        where: { id: issueDto.studentId },
        include: { user: true }});
      if (!student )
        throw new NotFoundException('Student not found');
      finalHolderName = `${student.user.firstName} ${student.user.lastName}`.trim();
    } else if (template.roleType === 'STAFF') {
      if (!issueDto.staffId)
        throw new BadRequestException('staffId is required for STAFF ID Cards');
      const staff = await this.prisma.staff.findUnique({
        where: { id: issueDto.staffId },
        include: { user: true }});
      if (!staff )
        throw new NotFoundException('Staff not found');
      finalHolderName = `${staff.user.firstName} ${staff.user.lastName}`.trim();
    } else if (template.roleType === 'TEMPORARY') {
      if (!issueDto.holderName)
        throw new BadRequestException('holderName is required for TEMPORARY ID Cards');
      if (!issueDto.validUntil)
        throw new BadRequestException('validUntil is required for TEMPORARY ID Cards');
    }

    // 3. Create Issued Record
    const cardNumber = this.generateCardNumber();
    const issueDate = new Date();

    const issuedCard = await this.prisma.issuedIdCard.create({
      data: {
        
        templateId: issueDto.templateId,
        studentId: issueDto.studentId,
        staffId: issueDto.staffId,
        holderName: finalHolderName,
        cardNumber,
        barcodeData: issueDto.barcodeData || cardNumber,
        issueDate,
        validUntil: issueDto.validUntil ? new Date(issueDto.validUntil) : null}});

    // 4. Render HTML
    let renderedHtml = template.contentHtml;

    // Simple string replacements
    renderedHtml = renderedHtml.replace(/\{\{holderName\}\}/g, finalHolderName);
    renderedHtml = renderedHtml.replace(/\{\{cardNumber\}\}/g, cardNumber);
    renderedHtml = renderedHtml.replace(/\{\{barcodeData\}\}/g, issuedCard.barcodeData || '');
    renderedHtml = renderedHtml.replace(/\{\{issueDate\}\}/g, issueDate.toLocaleDateString());
    if (issuedCard.validUntil) {
      renderedHtml = renderedHtml.replace(
        /\{\{validUntil\}\}/g,
        issuedCard.validUntil.toLocaleDateString(),
      );
    }

    return {
      card: issuedCard,
      renderedHtml, // Frontend can render this into a PDF or CR80 Canvas
      backgroundUrl: template.backgroundUrl};
  }

  async findAll( queryOptions: IssuedIdCardQueryOptionsDto) {
    const where: Prisma.IssuedIdCardWhereInput = {
      
    };

    if (queryOptions.templateId) where.templateId = queryOptions.templateId;
    if (queryOptions.studentId) where.studentId = queryOptions.studentId;
    if (queryOptions.staffId) where.staffId = queryOptions.staffId;

    const itemCount = await this.prisma.issuedIdCard.count({ where });

    const cards = await this.prisma.issuedIdCard.findMany({
      where,
      orderBy: { issueDate: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        template: { select: { name: true, roleType: true } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(cards, pageMetaDto);
  }

  async revokeCard(id: string, ) {
    const card = await this.prisma.issuedIdCard.findFirst({
      where: { id}});

    if (!card) throw new NotFoundException('Issued ID Card not found');

    return this.prisma.issuedIdCard.update({
      where: { id },
      data: { isActive: false }});
  }

  /**
   * PUBLIC ENDPOINT: Verifies a card by its unique QR code / Barcode number.
   * Does NOT require or authentication.
   */
  async verifyCard(cardNumber: string) {
    const card = await this.prisma.issuedIdCard.findUnique({
      where: { cardNumber },
      include: {
        template: { select: { name: true, roleType: true } },
        student: { include: { branch: { select: { name: true } } } },
        staff: { include: { branch: { select: { name: true } } } },
      },
    });

    if (!card) {
      throw new NotFoundException('Invalid ID Card Number.');
    }

    const now = new Date();
    const isExpired = card.validUntil ? now > card.validUntil : false;

    // Determine final validity state
    const isValid = card.isActive && !isExpired;

    return {
      isValid,
      status: !card.isActive ? 'REVOKED' : isExpired ? 'EXPIRED' : 'ACTIVE',
      issuedBy: card.student?.branch?.name || card.staff?.branch?.name || 'Institute',
      holderName: card.holderName,
      roleType: card.template?.roleType || 'Student',
      issueDate: card.issueDate,
      validUntil: card.validUntil,
      cardNumber: card.cardNumber};
  }
}
