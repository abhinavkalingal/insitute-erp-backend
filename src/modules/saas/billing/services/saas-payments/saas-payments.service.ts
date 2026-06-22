import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma-master/client';

import { PaymentGatewayService } from '../../../payment-gateway/services/payment-gateway/payment-gateway.service';
import {
  InitiateSaasPaymentDto,
  SaasPaymentQueryOptionsDto,
  UpdateSaasPaymentStatusDto} from '../../dto/saas-payment.dto';

@Injectable()
export class SaasPaymentsService {
  constructor(
    private readonly prisma: PrismaMasterService,
    private readonly paymentGateway: PaymentGatewayService,
  ) {}

  async initiatePayment(instituteId: string, initiateDto: InitiateSaasPaymentDto) {
    const invoice = await this.prisma.saasInvoice.findUnique({
      where: { id: initiateDto.invoiceId }});

    if (!invoice) throw new NotFoundException('SaasInvoice not found');
    if (invoice.instituteId !== instituteId)
      throw new BadRequestException('Invoice does not belong to this institute');
    if (invoice.status === 'PAID') throw new BadRequestException('Invoice is already paid');
    if (invoice.status === 'VOID') throw new BadRequestException('Invoice is voided');

    let gatewayOrderId = null;

    // Only create a Razorpay Order if the method expects an online gateway
    if (initiateDto.paymentMethod !== 'MANUAL') {
      const receiptId = `receipt_${invoice.id}`;
      const order = await this.paymentGateway.createOrder(initiateDto.amount, receiptId);
      gatewayOrderId = order.id; // e.g. "order_Hxz..."
    }

    return this.prisma.saasPayment.create({
      data: {
        instituteId,
        invoiceId: invoice.id,
        amount: initiateDto.amount,
        paymentMethod: initiateDto.paymentMethod,
        gatewayOrderId,
        status: 'PENDING'}});
  }

  async updatePaymentStatus(id: string, updateDto: UpdateSaasPaymentStatusDto) {
    return this.prisma.$transaction(async (prisma) => {
      const payment = await prisma.saasPayment.findUnique({
        where: { id },
        include: { invoice: true }});

      if (!payment) throw new NotFoundException('SaasPayment not found');
      if (payment.status === 'SUCCESS')
        throw new BadRequestException('Payment is already successful');

      const updatedPayment = await prisma.saasPayment.update({
        where: { id },
        data: {
          status: updateDto.status,
          transactionId: updateDto.transactionId,
          metadata: updateDto.metadata
            ? (updateDto.metadata as Prisma.InputJsonValue)
            : Prisma.JsonNull}});

      // If the payment is successful, mark the invoice as PAID and activate subscription
      if (updateDto.status === 'SUCCESS') {
        const invoice = await prisma.saasInvoice.update({
          where: { id: payment.invoiceId as string },
          data: {
            status: 'PAID',
            paidAt: new Date()}});

        if (invoice.subscriptionId) {
          await prisma.subscription.update({
            where: { id: invoice.subscriptionId },
            data: { status: 'ACTIVE' }, // Reactivate if PAST_DUE
          });
        }
      }

      return updatedPayment;
    });
  }

  async findAll(instituteId: string, queryOptions: SaasPaymentQueryOptionsDto) {
    const where: Prisma.SaasPaymentWhereInput = { instituteId };

    if (queryOptions.status) where.status = queryOptions.status;
    if (queryOptions.invoiceId) where.invoiceId = queryOptions.invoiceId;

    if (queryOptions.search) {
      where.transactionId = { contains: queryOptions.search, mode: 'insensitive' };
    }

    const itemCount = await this.prisma.saasPayment.count({ where });

    const payments = await this.prisma.saasPayment.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        institute: { select: { name: true } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(payments, pageMetaDto);
  }

  async findOne(id: string) {
    const payment = await this.prisma.saasPayment.findUnique({
      where: { id },
      include: { invoice: true, institute: true }});

    if (!payment) throw new NotFoundException('SaasPayment not found');

    return payment;
  }
}
