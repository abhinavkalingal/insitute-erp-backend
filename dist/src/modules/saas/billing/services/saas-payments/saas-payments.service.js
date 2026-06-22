"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaasPaymentsService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_master_service_1 = require("../../../../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma-master/client");
const payment_gateway_service_1 = require("../../../payment-gateway/services/payment-gateway/payment-gateway.service");
let SaasPaymentsService = class SaasPaymentsService {
    prisma;
    paymentGateway;
    constructor(prisma, paymentGateway) {
        this.prisma = prisma;
        this.paymentGateway = paymentGateway;
    }
    async initiatePayment(instituteId, initiateDto) {
        const invoice = await this.prisma.saasInvoice.findUnique({
            where: { id: initiateDto.invoiceId }
        });
        if (!invoice)
            throw new common_1.NotFoundException('SaasInvoice not found');
        if (invoice.instituteId !== instituteId)
            throw new common_1.BadRequestException('Invoice does not belong to this institute');
        if (invoice.status === 'PAID')
            throw new common_1.BadRequestException('Invoice is already paid');
        if (invoice.status === 'VOID')
            throw new common_1.BadRequestException('Invoice is voided');
        let gatewayOrderId = null;
        if (initiateDto.paymentMethod !== 'MANUAL') {
            const receiptId = `receipt_${invoice.id}`;
            const order = await this.paymentGateway.createOrder(initiateDto.amount, receiptId);
            gatewayOrderId = order.id;
        }
        return this.prisma.saasPayment.create({
            data: {
                instituteId,
                invoiceId: invoice.id,
                amount: initiateDto.amount,
                paymentMethod: initiateDto.paymentMethod,
                gatewayOrderId,
                status: 'PENDING'
            }
        });
    }
    async updatePaymentStatus(id, updateDto) {
        return this.prisma.$transaction(async (prisma) => {
            const payment = await prisma.saasPayment.findUnique({
                where: { id },
                include: { invoice: true }
            });
            if (!payment)
                throw new common_1.NotFoundException('SaasPayment not found');
            if (payment.status === 'SUCCESS')
                throw new common_1.BadRequestException('Payment is already successful');
            const updatedPayment = await prisma.saasPayment.update({
                where: { id },
                data: {
                    status: updateDto.status,
                    transactionId: updateDto.transactionId,
                    metadata: updateDto.metadata
                        ? updateDto.metadata
                        : client_1.Prisma.JsonNull
                }
            });
            if (updateDto.status === 'SUCCESS') {
                const invoice = await prisma.saasInvoice.update({
                    where: { id: payment.invoiceId },
                    data: {
                        status: 'PAID',
                        paidAt: new Date()
                    }
                });
                if (invoice.subscriptionId) {
                    await prisma.subscription.update({
                        where: { id: invoice.subscriptionId },
                        data: { status: 'ACTIVE' },
                    });
                }
            }
            return updatedPayment;
        });
    }
    async findAll(instituteId, queryOptions) {
        const where = { instituteId };
        if (queryOptions.status)
            where.status = queryOptions.status;
        if (queryOptions.invoiceId)
            where.invoiceId = queryOptions.invoiceId;
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
                institute: { select: { name: true } }
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(payments, pageMetaDto);
    }
    async findOne(id) {
        const payment = await this.prisma.saasPayment.findUnique({
            where: { id },
            include: { invoice: true, institute: true }
        });
        if (!payment)
            throw new common_1.NotFoundException('SaasPayment not found');
        return payment;
    }
};
exports.SaasPaymentsService = SaasPaymentsService;
exports.SaasPaymentsService = SaasPaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_master_service_1.PrismaMasterService,
        payment_gateway_service_1.PaymentGatewayService])
], SaasPaymentsService);
//# sourceMappingURL=saas-payments.service.js.map