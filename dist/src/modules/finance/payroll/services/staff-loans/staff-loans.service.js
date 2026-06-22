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
exports.StaffLoansService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let StaffLoansService = class StaffLoansService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const staff = await this.prisma.staff.findUnique({
            where: { id: createDto.staffId }
        });
        if (!staff) {
            throw new common_1.NotFoundException('Staff not found');
        }
        return this.prisma.staffLoan.create({
            data: {
                ...createDto,
                remainingAmount: createDto.amount,
            }
        });
    }
    async findAll(queryOptions) {
        const where = {};
        if (queryOptions.staffId) {
            where.staffId = queryOptions.staffId;
        }
        if (queryOptions.status) {
            where.status = queryOptions.status;
        }
        const itemCount = await this.prisma.staffLoan.count({ where });
        const loans = await this.prisma.staffLoan.findMany({
            where,
            orderBy: { issueDate: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take,
            include: {
                staff: { include: { user: { select: { firstName: true, lastName: true } } } }
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(loans, pageMetaDto);
    }
    async findOne(id) {
        const loan = await this.prisma.staffLoan.findFirst({
            where: { id },
            include: {
                staff: { include: { user: { select: { firstName: true, lastName: true } } } }
            }
        });
        if (!loan) {
            throw new common_1.NotFoundException('Staff Loan not found');
        }
        return loan;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        if (updateDto.staffId) {
            const staff = await this.prisma.staff.findUnique({
                where: { id: updateDto.staffId }
            });
            if (!staff) {
                throw new common_1.NotFoundException('Staff not found');
            }
        }
        return this.prisma.staffLoan.update({
            where: { id },
            data: updateDto
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.staffLoan.delete({
            where: { id }
        });
    }
};
exports.StaffLoansService = StaffLoansService;
exports.StaffLoansService = StaffLoansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StaffLoansService);
//# sourceMappingURL=staff-loans.service.js.map