"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const page_dto_1 = require("../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
const invoice_dto_1 = require("../../dto/invoice.dto");
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateReceiptNumber() {
        const date = new Date();
        const yyyyMm = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;
        const hash = crypto.randomBytes(3).toString('hex').toUpperCase();
        return `RCP-${yyyyMm}-${hash}`;
    }
    async create(createDto) {
        return this.prisma.$transaction(async (tx) => {
            const invoice = await tx.invoice.findFirst({
                where: { id: createDto.invoiceId }
            });
            if (!invoice)
                throw new common_1.NotFoundException('Invoice not found');
            if (invoice.status === invoice_dto_1.InvoiceStatus.PAID) {
                throw new common_1.BadRequestException('Invoice is already fully paid');
            }
            const payment = await tx.payment.create({
                data: {
                    invoiceId: createDto.invoiceId,
                    receiptNumber: this.generateReceiptNumber(),
                    amount: createDto.amount,
                    paymentDate: createDto.paymentDate ? new Date(createDto.paymentDate) : new Date(),
                    paymentMethod: createDto.paymentMethod,
                    reference: createDto.reference,
                    remarks: createDto.remarks,
                    status: 'SUCCESS',
                }
            });
            const newPaidAmount = invoice.paidAmount + createDto.amount;
            let newStatus = invoice.status;
            if (newPaidAmount >= invoice.totalAmount) {
                newStatus = invoice_dto_1.InvoiceStatus.PAID;
            }
            else if (newPaidAmount > 0) {
                newStatus = invoice_dto_1.InvoiceStatus.PARTIAL;
            }
            await tx.invoice.update({
                where: { id: invoice.id },
                data: {
                    paidAmount: newPaidAmount,
                    status: newStatus
                }
            });
            return payment;
        });
    }
    async findAll(queryOptions) {
        const where = {};
        if (queryOptions.invoiceId)
            where.invoiceId = queryOptions.invoiceId;
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
                        student: { select: { user: { select: { firstName: true, lastName: true } } } }
                    }
                }
            },
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(payments, pageMetaDto);
    }
    async findOne(id) {
        const payment = await this.prisma.payment.findFirst({
            where: { id },
            include: {
                invoice: { include: { student: { include: { user: true } } } }
            }
        });
        if (!payment)
            throw new common_1.NotFoundException('Payment not found');
        return payment;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map