import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma-master/client';
import { randomUUID } from 'crypto';

import { GenerateSaasInvoiceDto, SaasInvoiceQueryOptionsDto } from '../../dto/saas-invoice.dto';

@Injectable()
export class SaasInvoicesService {
  private readonly TAX_RATE = 0.18; // Hardcoded 18% tax for now

  constructor(private readonly prisma: PrismaMasterService) {}

  private generateInvoiceNumber(): string {
    const year = new Date().getFullYear();
    const shortId = randomUUID().split('-')[0].toUpperCase();
    return `INV-SAAS-${year}-${shortId}`;
  }

  async generateInvoice(instituteId: string, generateDto: GenerateSaasInvoiceDto) {
    const institute = await this.prisma.institute.findUnique({
      where: { id: instituteId }});

    if (!institute) {
      throw new NotFoundException('Institute not found');
    }

    if (generateDto.subscriptionId) {
      const subscription = await this.prisma.subscription.findUnique({
        where: { id: generateDto.subscriptionId }});
      if (!subscription) throw new NotFoundException('Subscription not found');
    }

    return this.prisma.saasInvoice.create({
      data: {
        instituteId,
        subscriptionId: generateDto.subscriptionId,
        amount: generateDto.amount,
        status: 'DUE',
        dueDate: new Date(generateDto.dueDate),
      }});
  }

  async findAll(instituteId: string | null, queryOptions: SaasInvoiceQueryOptionsDto) {
    const where: Prisma.SaasInvoiceWhereInput = {};
    if (instituteId) {
      where.instituteId = instituteId;
    }

    if (queryOptions.status) {
      where.status = queryOptions.status;
    }

    const itemCount = await this.prisma.saasInvoice.count({ where });

    const invoices = await this.prisma.saasInvoice.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        institute: { select: { name: true } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(invoices, pageMetaDto);
  }

  async findOne(id: string) {
    const invoice = await this.prisma.saasInvoice.findUnique({
      where: { id },
      include: {
        institute: true,
        subscription: true,
        payments: true}});

    if (!invoice) {
      throw new NotFoundException('SaasInvoice not found');
    }

    return invoice;
  }

  async voidInvoice(id: string) {
    const invoice = await this.findOne(id);

    if (invoice.status === 'PAID') {
      throw new BadRequestException('Cannot void an already paid invoice');
    }

    return this.prisma.saasInvoice.update({
      where: { id },
      data: { status: 'VOID' }});
  }
}
