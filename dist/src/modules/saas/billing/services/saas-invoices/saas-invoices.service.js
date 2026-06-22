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
exports.SaasInvoicesService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_master_service_1 = require("../../../../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let SaasInvoicesService = class SaasInvoicesService {
    prisma;
    TAX_RATE = 0.18;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateInvoiceNumber() {
        const year = new Date().getFullYear();
        const shortId = (0, crypto_1.randomUUID)().split('-')[0].toUpperCase();
        return `INV-SAAS-${year}-${shortId}`;
    }
    async generateInvoice(instituteId, generateDto) {
        const institute = await this.prisma.institute.findUnique({
            where: { id: instituteId }
        });
        if (!institute) {
            throw new common_1.NotFoundException('Institute not found');
        }
        if (generateDto.subscriptionId) {
            const subscription = await this.prisma.subscription.findUnique({
                where: { id: generateDto.subscriptionId }
            });
            if (!subscription)
                throw new common_1.NotFoundException('Subscription not found');
        }
        return this.prisma.saasInvoice.create({
            data: {
                instituteId,
                subscriptionId: generateDto.subscriptionId,
                amount: generateDto.amount,
                status: 'DUE',
                dueDate: new Date(generateDto.dueDate),
            }
        });
    }
    async findAll(instituteId, queryOptions) {
        const where = {};
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
                institute: { select: { name: true } }
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(invoices, pageMetaDto);
    }
    async findOne(id) {
        const invoice = await this.prisma.saasInvoice.findUnique({
            where: { id },
            include: {
                institute: true,
                subscription: true,
                payments: true
            }
        });
        if (!invoice) {
            throw new common_1.NotFoundException('SaasInvoice not found');
        }
        return invoice;
    }
    async voidInvoice(id) {
        const invoice = await this.findOne(id);
        if (invoice.status === 'PAID') {
            throw new common_1.BadRequestException('Cannot void an already paid invoice');
        }
        return this.prisma.saasInvoice.update({
            where: { id },
            data: { status: 'VOID' }
        });
    }
};
exports.SaasInvoicesService = SaasInvoicesService;
exports.SaasInvoicesService = SaasInvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_master_service_1.PrismaMasterService])
], SaasInvoicesService);
//# sourceMappingURL=saas-invoices.service.js.map