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
exports.PaymentsService = void 0;
const page_dto_1 = require("../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async collectPayment(collectDto) {
        return this.prisma.$transaction(async (prisma) => {
            const invoice = await prisma.invoice.findUnique({
                where: { id: collectDto.invoiceId }
            });
            if (!invoice) {
                throw new common_1.NotFoundException('Invoice not found');
            }
            if (invoice.status === 'PAID' || invoice.status === 'CANCELLED') {
                throw new common_1.ConflictException(`Cannot pay against an invoice that is ${invoice.status}`);
            }
            const balanceRemaining = invoice.totalAmount - invoice.paidAmount;
            if (collectDto.amount <= 0) {
                throw new common_1.BadRequestException('Amount must be greater than zero');
            }
            if (collectDto.amount > balanceRemaining) {
                throw new common_1.BadRequestException(`Amount exceeds remaining balance of ${balanceRemaining}`);
            }
            const newPaidAmount = invoice.paidAmount + collectDto.amount;
            const newStatus = newPaidAmount >= invoice.totalAmount ? 'PAID' : 'PARTIAL';
            const receiptNumber = `RCP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
            const payment = await prisma.payment.create({
                data: {
                    invoiceId: invoice.id,
                    receiptNumber,
                    amount: collectDto.amount,
                    paymentMethod: collectDto.paymentMethod,
                    reference: collectDto.reference,
                    remarks: collectDto.remarks,
                    status: 'SUCCESS'
                }
            });
            await prisma.invoice.update({
                where: { id: invoice.id },
                data: {
                    paidAmount: newPaidAmount,
                    status: newStatus
                }
            });
            return payment;
        });
    }
    async refundPayment(id) {
        return this.prisma.$transaction(async (prisma) => {
            const payment = await prisma.payment.findUnique({
                where: { id },
                include: { invoice: true }
            });
            if (!payment) {
                throw new common_1.NotFoundException('Payment not found');
            }
            if (payment.status === 'REFUNDED') {
                throw new common_1.ConflictException('Payment is already refunded');
            }
            if (payment.status !== 'SUCCESS') {
                throw new common_1.ConflictException(`Cannot refund payment in ${payment.status} state`);
            }
            const invoice = payment.invoice;
            const newPaidAmount = Math.max(0, invoice.paidAmount - payment.amount);
            const newStatus = newPaidAmount === 0 ? 'PENDING' : 'PARTIAL';
            const updatedPayment = await prisma.payment.update({
                where: { id },
                data: { status: 'REFUNDED' }
            });
            await prisma.invoice.update({
                where: { id: invoice.id },
                data: {
                    paidAmount: newPaidAmount,
                    status: newStatus
                }
            });
            return updatedPayment;
        });
    }
    async findAll(queryOptions) {
        const where = {};
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
                invoice: { select: { invoiceNumber: true, totalAmount: true } }
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(payments, pageMetaDto);
    }
    async findOne(id) {
        const payment = await this.prisma.payment.findFirst({
            where: { id },
            include: {
                invoice: {
                    include: {
                        student: { include: { user: { select: { firstName: true, lastName: true } } } }
                    }
                }
            }
        });
        if (!payment) {
            throw new common_1.NotFoundException('Payment/Receipt not found');
        }
        return payment;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map