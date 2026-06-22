import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as crypto from 'crypto';

import {
  CreateInvoiceDto,
  InvoiceQueryOptionsDto,
  InvoiceStatus,
  UpdateInvoiceDto} from '../../dto/invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  private generateInvoiceNumber(): string {
    const date = new Date();
    const yyyyMm = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;
    const hash = crypto.randomBytes(3).toString('hex').toUpperCase();
    return `INV-${yyyyMm}-${hash}`;
  }

  async create( createDto: CreateInvoiceDto) {
    const { items, ...invoiceData } = createDto;

    // Calculate total amount from items
    const totalAmount =
      items.reduce((sum, item) => sum + item.amount, 0) - (invoiceData.discount || 0);

    return this.prisma.$transaction(async (tx) => {
      const invoice = await tx.invoice.create({
        data: {
          ...invoiceData,
          
          invoiceNumber: this.generateInvoiceNumber(),
          status: InvoiceStatus.PENDING,
          totalAmount,
          paidAmount: 0}});

      if (items && items.length > 0) {
        await tx.invoiceItem.createMany({
          data: items.map((item) => ({
            invoiceId: invoice.id,
            feeStructureId: item.feeStructureId,
            description: item.description,
            amount: item.amount}))});
      }

      return this.findOne(invoice.id,  tx);
    });
  }

  async findAll( queryOptions: InvoiceQueryOptionsDto) {
    const where: Prisma.InvoiceWhereInput = {
      
    };

    if (queryOptions.studentId) where.studentId = queryOptions.studentId;
    if (queryOptions.status) where.status = queryOptions.status;
    if (queryOptions.invoiceNumber) {
      where.invoiceNumber = { contains: queryOptions.invoiceNumber, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.invoice.count({ where });

    const invoices = await this.prisma.invoice.findMany({
      where,
      include: {
        student: { include: { user: { select: { firstName: true, lastName: true } } } }},
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(invoices, pageMetaDto);
  }

  async findOne(id: string,  tx: any = this.prisma) {
    const invoice = await tx.invoice.findFirst({
      where: { id},
      include: {
        student: {
          include: { user: { select: { firstName: true, lastName: true, email: true } } }},
        items: true,
        payments: { orderBy: { paymentDate: 'desc' } }}});

    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async update(id: string,  updateDto: UpdateInvoiceDto) {
    const invoice = await this.findOne(id, );

    // Recalculate total if discount changed
    let newTotal = invoice.totalAmount;
    if (updateDto.discount !== undefined) {
      const gross = invoice.totalAmount + invoice.discount;
      newTotal = gross - updateDto.discount;
    }

    return this.prisma.invoice.update({
      where: { id },
      data: {
        ...updateDto,
        totalAmount: newTotal}});
  }

  async remove(id: string, ) {
    await this.findOne(id, );

    // We physically delete here, but accounting systems might prefer soft-deleting.
    // Given the prompt, we'll physically delete. Cascade will drop items and payments.
    return this.prisma.invoice.delete({
      where: { id }});
  }
}
