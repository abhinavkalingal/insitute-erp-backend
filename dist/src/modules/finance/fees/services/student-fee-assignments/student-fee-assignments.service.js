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
exports.StudentFeeAssignmentsService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let StudentFeeAssignmentsService = class StudentFeeAssignmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assignFee(assignDto) {
        const student = await this.prisma.student.findUnique({
            where: { id: assignDto.studentId }
        });
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        const feeStructure = await this.prisma.feeStructure.findUnique({
            where: { id: assignDto.feeStructureId },
            include: { category: true }
        });
        if (!feeStructure) {
            throw new common_1.NotFoundException('Fee Structure not found');
        }
        let discountAmount = 0;
        if (assignDto.discountId) {
            const discount = await this.prisma.feeDiscount.findUnique({
                where: { id: assignDto.discountId }
            });
            if (!discount) {
                throw new common_1.NotFoundException('Fee Discount not found');
            }
            if (discount.type === 'PERCENTAGE') {
                discountAmount = feeStructure.amount * (discount.value / 100);
            }
            else {
                discountAmount = discount.value;
            }
        }
        const netAmount = Math.max(0, feeStructure.amount - discountAmount);
        const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        return this.prisma.$transaction(async (prisma) => {
            const invoice = await prisma.invoice.create({
                data: {
                    studentId: assignDto.studentId,
                    invoiceNumber,
                    issueDate: new Date(),
                    dueDate: assignDto.dueDate ? new Date(assignDto.dueDate) : new Date(),
                    status: 'PENDING',
                    totalAmount: netAmount,
                    discountId: assignDto.discountId,
                    discount: discountAmount,
                    items: {
                        create: {
                            feeStructureId: feeStructure.id,
                            description: feeStructure.name,
                            amount: feeStructure.amount
                        }
                    }
                },
                include: {
                    items: true
                }
            });
            return invoice;
        });
    }
    async findAll(queryOptions) {
        const where = {};
        if (queryOptions.studentId) {
            where.studentId = queryOptions.studentId;
        }
        if (queryOptions.status) {
            where.status = queryOptions.status;
        }
        if (queryOptions.feeStructureId) {
            where.items = {
                some: { feeStructureId: queryOptions.feeStructureId }
            };
        }
        const itemCount = await this.prisma.invoice.count({ where });
        const invoices = await this.prisma.invoice.findMany({
            where,
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take,
            include: {
                student: { include: { user: { select: { firstName: true, lastName: true } } } },
                items: true,
                feeDiscount: { select: { name: true, type: true, value: true } }
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(invoices, pageMetaDto);
    }
    async findOne(id) {
        const invoice = await this.prisma.invoice.findFirst({
            where: { id },
            include: {
                student: { include: { user: { select: { firstName: true, lastName: true } } } },
                items: { include: { feeStructure: { select: { name: true } } } },
                feeDiscount: true,
                payments: true
            }
        });
        if (!invoice) {
            throw new common_1.NotFoundException('Fee Assignment / Invoice not found');
        }
        return invoice;
    }
};
exports.StudentFeeAssignmentsService = StudentFeeAssignmentsService;
exports.StudentFeeAssignmentsService = StudentFeeAssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentFeeAssignmentsService);
//# sourceMappingURL=student-fee-assignments.service.js.map