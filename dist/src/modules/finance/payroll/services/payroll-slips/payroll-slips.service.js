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
exports.PayrollSlipsService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PayrollSlipsService = class PayrollSlipsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generate(generateDto) {
        const { staffId, month, year } = generateDto;
        const existingSlip = await this.prisma.payrollSlip.findUnique({
            where: {
                staffId_month_year: { staffId, month, year }
            }
        });
        if (existingSlip) {
            throw new common_1.ConflictException(`A payroll slip for ${month}/${year} already exists for this staff member`);
        }
        const structure = await this.prisma.salaryStructure.findUnique({
            where: { staffId }
        });
        if (!structure) {
            throw new common_1.NotFoundException('Salary Structure not defined for this staff member');
        }
        const activeLoans = await this.prisma.staffLoan.findMany({
            where: {
                staffId,
                status: 'ACTIVE'
            }
        });
        let totalLoanDeduction = 0;
        for (const loan of activeLoans) {
            const deduction = Math.min(loan.deductionPerMonth, loan.remainingAmount);
            totalLoanDeduction += deduction;
        }
        const netPay = Math.max(0, structure.netSalary - totalLoanDeduction);
        return this.prisma.payrollSlip.create({
            data: {
                staffId,
                month,
                year,
                basicPay: structure.basicPay,
                allowances: structure.allowances ?? client_1.Prisma.JsonNull,
                deductions: structure.deductions ?? client_1.Prisma.JsonNull,
                loanDeduction: totalLoanDeduction,
                netPay,
                status: 'GENERATED'
            }
        });
    }
    async paySlip(id, payDto) {
        return this.prisma.$transaction(async (prisma) => {
            const slip = await prisma.payrollSlip.findUnique({
                where: { id }
            });
            if (!slip) {
                throw new common_1.NotFoundException('Payroll slip not found');
            }
            if (slip.status === 'PAID') {
                throw new common_1.ConflictException('Payroll slip is already paid');
            }
            if (slip.loanDeduction > 0) {
                const activeLoans = await prisma.staffLoan.findMany({
                    where: {
                        staffId: slip.staffId,
                        status: 'ACTIVE'
                    },
                    orderBy: { issueDate: 'asc' },
                });
                let remainingDeductionToApply = slip.loanDeduction;
                for (const loan of activeLoans) {
                    if (remainingDeductionToApply <= 0)
                        break;
                    const deductionForThisLoan = Math.min(loan.remainingAmount, remainingDeductionToApply);
                    const newRemaining = loan.remainingAmount - deductionForThisLoan;
                    await prisma.staffLoan.update({
                        where: { id: loan.id },
                        data: {
                            remainingAmount: newRemaining,
                            status: newRemaining <= 0 ? 'PAID_OFF' : 'ACTIVE'
                        }
                    });
                    remainingDeductionToApply -= deductionForThisLoan;
                }
            }
            return prisma.payrollSlip.update({
                where: { id },
                data: {
                    status: 'PAID',
                    paymentDate: new Date(payDto.paymentDate),
                    paymentMethod: payDto.paymentMethod,
                    reference: payDto.reference
                }
            });
        });
    }
    async findAll(queryOptions) {
        const where = {};
        if (queryOptions.staffId) {
            where.staffId = queryOptions.staffId;
        }
        if (queryOptions.month) {
            where.month = queryOptions.month;
        }
        if (queryOptions.year) {
            where.year = queryOptions.year;
        }
        if (queryOptions.status) {
            where.status = queryOptions.status;
        }
        const itemCount = await this.prisma.payrollSlip.count({ where });
        const slips = await this.prisma.payrollSlip.findMany({
            where,
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take,
            include: {
                staff: { include: { user: { select: { firstName: true, lastName: true } } } }
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(slips, pageMetaDto);
    }
    async findOne(id) {
        const slip = await this.prisma.payrollSlip.findFirst({
            where: { id },
            include: {
                staff: { include: { user: { select: { firstName: true, lastName: true } } } }
            }
        });
        if (!slip) {
            throw new common_1.NotFoundException('Payroll slip not found');
        }
        return slip;
    }
};
exports.PayrollSlipsService = PayrollSlipsService;
exports.PayrollSlipsService = PayrollSlipsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayrollSlipsService);
//# sourceMappingURL=payroll-slips.service.js.map