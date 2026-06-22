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
exports.InvoicesService = void 0;
const page_dto_1 = require("../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
const invoice_dto_1 = require("../../dto/invoice.dto");
let InvoicesService = class InvoicesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateInvoiceNumber() {
        const date = new Date();
        const yyyyMm = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;
        const hash = crypto.randomBytes(3).toString('hex').toUpperCase();
        return `INV-${yyyyMm}-${hash}`;
    }
    async create(createDto) {
        const { items, ...invoiceData } = createDto;
        const totalAmount = items.reduce((sum, item) => sum + item.amount, 0) - (invoiceData.discount || 0);
        return this.prisma.$transaction(async (tx) => {
            const invoice = await tx.invoice.create({
                data: {
                    ...invoiceData,
                    invoiceNumber: this.generateInvoiceNumber(),
                    status: invoice_dto_1.InvoiceStatus.PENDING,
                    totalAmount,
                    paidAmount: 0
                }
            });
            if (items && items.length > 0) {
                await tx.invoiceItem.createMany({
                    data: items.map((item) => ({
                        invoiceId: invoice.id,
                        feeStructureId: item.feeStructureId,
                        description: item.description,
                        amount: item.amount
                    }))
                });
            }
            return this.findOne(invoice.id, tx);
        });
    }
    async findAll(queryOptions) {
        const where = {};
        if (queryOptions.studentId)
            where.studentId = queryOptions.studentId;
        if (queryOptions.status)
            where.status = queryOptions.status;
        if (queryOptions.invoiceNumber) {
            where.invoiceNumber = { contains: queryOptions.invoiceNumber, mode: 'insensitive' };
        }
        const itemCount = await this.prisma.invoice.count({ where });
        const invoices = await this.prisma.invoice.findMany({
            where,
            include: {
                student: { include: { user: { select: { firstName: true, lastName: true } } } }
            },
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(invoices, pageMetaDto);
    }
    async findOne(id, tx = this.prisma) {
        const invoice = await tx.invoice.findFirst({
            where: { id },
            include: {
                student: {
                    include: { user: { select: { firstName: true, lastName: true, email: true } } }
                },
                items: true,
                payments: { orderBy: { paymentDate: 'desc' } }
            }
        });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        return invoice;
    }
    async update(id, updateDto) {
        const invoice = await this.findOne(id);
        let newTotal = invoice.totalAmount;
        if (updateDto.discount !== undefined) {
            const gross = invoice.totalAmount + invoice.discount;
            newTotal = gross - updateDto.discount;
        }
        return this.prisma.invoice.update({
            where: { id },
            data: {
                ...updateDto,
                totalAmount: newTotal
            }
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.invoice.delete({
            where: { id }
        });
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map