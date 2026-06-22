import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as crypto from 'crypto';

import { InvoiceStatus } from '../../dto/invoice.dto';
import { CreatePaymentDto, PaymentQueryOptionsDto } from '../../dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  private generateReceiptNumber(): string {
    const date = new Date();
    const yyyyMm = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;
    const hash = crypto.randomBytes(3).toString('hex').toUpperCase();
    return `RCP-${yyyyMm}-${hash}`;
  }

  async create( createDto: CreatePaymentDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Fetch the parent invoice
      const invoice = await tx.invoice.findFirst({
        where: { id: createDto.invoiceId}});

      if (!invoice) throw new NotFoundException('Invoice not found');
      if (invoice.status === InvoiceStatus.PAID) {
        throw new BadRequestException('Invoice is already fully paid');
      }

      // 2. Create the payment record
      const payment = await tx.payment.create({
        data: {
          
          invoiceId: createDto.invoiceId,
          receiptNumber: this.generateReceiptNumber(),
          amount: createDto.amount,
          paymentDate: createDto.paymentDate ? new Date(createDto.paymentDate) : new Date(),
          paymentMethod: createDto.paymentMethod,
          reference: createDto.reference,
          remarks: createDto.remarks,
          status: 'SUCCESS', // Automatically assume success for direct recording
        }});

      // 3. Update parent invoice total paid
      const newPaidAmount = invoice.paidAmount + createDto.amount;

      // Determine new status
      let newStatus = invoice.status;
      if (newPaidAmount >= invoice.totalAmount) {
        newStatus = InvoiceStatus.PAID;
      } else if (newPaidAmount > 0) {
        newStatus = InvoiceStatus.PARTIAL;
      }

      await tx.invoice.update({
        where: { id: invoice.id },
        data: {
          paidAmount: newPaidAmount,
          status: newStatus}});

      return payment;
    });
  }

  async findAll( queryOptions: PaymentQueryOptionsDto) {
    const where: Prisma.PaymentWhereInput = {
      
    };

    if (queryOptions.invoiceId) where.invoiceId = queryOptions.invoiceId;
    if (queryOptions.receiptNumber) {
      where.receiptNumber = { contains: queryOptions.receiptNumber, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.payment.count({ where });

    const payments = await this.prisma.payment.findMany({
      where,
      include: {
        invoice: {
          select: {
            invoiceNumber: true,
            student: { select: { user: { select: { firstName: true, lastName: true } } } }}}},
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(payments, pageMetaDto);
  }

  async findOne(id: string, ) {
    const payment = await this.prisma.payment.findFirst({
      where: { id},
      include: {
        invoice: { include: { student: { include: { user: true } } } }}});

    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }
}
