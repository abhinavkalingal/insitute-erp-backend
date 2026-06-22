import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CollectPaymentDto, PaymentQueryOptionsDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async collectPayment( collectDto: CollectPaymentDto) {
    // We use a transaction to ensure atomicity
    return this.prisma.$transaction(async (prisma) => {
      const invoice = await prisma.invoice.findUnique({
        where: { id: collectDto.invoiceId }});

      if (!invoice ) {
        throw new NotFoundException('Invoice not found');
      }

      if (invoice.status === 'PAID' || invoice.status === 'CANCELLED') {
        throw new ConflictException(`Cannot pay against an invoice that is ${invoice.status}`);
      }

      const balanceRemaining = invoice.totalAmount - invoice.paidAmount;

      if (collectDto.amount <= 0) {
        throw new BadRequestException('Amount must be greater than zero');
      }

      if (collectDto.amount > balanceRemaining) {
        throw new BadRequestException(`Amount exceeds remaining balance of ${balanceRemaining}`);
      }

      // Calculate new values
      const newPaidAmount = invoice.paidAmount + collectDto.amount;
      const newStatus = newPaidAmount >= invoice.totalAmount ? 'PAID' : 'PARTIAL';

      // 1. Create the Payment record
      const receiptNumber = `RCP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      const payment = await prisma.payment.create({
        data: {
          
          invoiceId: invoice.id,
          receiptNumber,
          amount: collectDto.amount,
          paymentMethod: collectDto.paymentMethod,
          reference: collectDto.reference,
          remarks: collectDto.remarks,
          status: 'SUCCESS'}});

      // 2. Update the Invoice
      await prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          paidAmount: newPaidAmount,
          status: newStatus}});

      return payment;
    });
  }

  async refundPayment(id: string, ) {
    return this.prisma.$transaction(async (prisma) => {
      const payment = await prisma.payment.findUnique({
        where: { id },
        include: { invoice: true }});

      if (!payment ) {
        throw new NotFoundException('Payment not found');
      }

      if (payment.status === 'REFUNDED') {
        throw new ConflictException('Payment is already refunded');
      }

      if (payment.status !== 'SUCCESS') {
        throw new ConflictException(`Cannot refund payment in ${payment.status} state`);
      }

      const invoice = payment.invoice;
      const newPaidAmount = Math.max(0, invoice.paidAmount - payment.amount);
      const newStatus = newPaidAmount === 0 ? 'PENDING' : 'PARTIAL';

      // 1. Mark payment as refunded
      const updatedPayment = await prisma.payment.update({
        where: { id },
        data: { status: 'REFUNDED' }});

      // 2. Rollback invoice ledger
      await prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          paidAmount: newPaidAmount,
          status: newStatus}});

      return updatedPayment;
    });
  }

  async findAll( queryOptions: PaymentQueryOptionsDto) {
    const where: Prisma.PaymentWhereInput = {
      
    };

    if (queryOptions.invoiceId) {
      where.invoiceId = queryOptions.invoiceId;
    }

    if (queryOptions.status) {
      where.status = queryOptions.status;
    }

    if (queryOptions.search) {
      where.receiptNumber = { contains: queryOptions.search, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.payment.count({ where });

    const payments = await this.prisma.payment.findMany({
      where,
      orderBy: { paymentDate: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        invoice: { select: { invoiceNumber: true, totalAmount: true } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(payments, pageMetaDto);
  }

  async findOne(id: string, ) {
    const payment = await this.prisma.payment.findFirst({
      where: { id},
      include: {
        invoice: {
          include: {
            student: { include: { user: { select: { firstName: true, lastName: true } } } }}}}});

    if (!payment) {
      throw new NotFoundException('Payment/Receipt not found');
    }

    return payment;
  }
}
