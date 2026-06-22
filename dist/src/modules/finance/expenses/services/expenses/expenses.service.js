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
exports.ExpensesService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let ExpensesService = class ExpensesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const category = await this.prisma.expenseCategory.findUnique({
            where: { id: createDto.categoryId }
        });
        if (!category) {
            throw new common_1.NotFoundException('Expense Category not found');
        }
        if (createDto.vendorId) {
            const vendor = await this.prisma.vendor.findUnique({
                where: { id: createDto.vendorId }
            });
            if (!vendor) {
                throw new common_1.NotFoundException('Vendor not found');
            }
        }
        return this.prisma.expense.create({
            data: {
                ...createDto
            },
            include: {
                category: true,
                vendor: true
            }
        });
    }
    async findAll(queryOptions) {
        const where = {};
        if (queryOptions.categoryId) {
            where.categoryId = queryOptions.categoryId;
        }
        if (queryOptions.vendorId) {
            where.vendorId = queryOptions.vendorId;
        }
        if (queryOptions.status) {
            where.status = queryOptions.status;
        }
        if (queryOptions.startDate || queryOptions.endDate) {
            where.expenseDate = {};
            if (queryOptions.startDate) {
                where.expenseDate.gte = new Date(queryOptions.startDate);
            }
            if (queryOptions.endDate) {
                where.expenseDate.lte = new Date(queryOptions.endDate);
            }
        }
        if (queryOptions.search) {
            where.OR = [
                { title: { contains: queryOptions.search, mode: 'insensitive' } },
                { referenceNumber: { contains: queryOptions.search, mode: 'insensitive' } },
            ];
        }
        const itemCount = await this.prisma.expense.count({ where });
        const expenses = await this.prisma.expense.findMany({
            where,
            orderBy: { expenseDate: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take,
            include: {
                category: { select: { name: true } },
                vendor: { select: { name: true } }
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(expenses, pageMetaDto);
    }
    async findOne(id) {
        const expense = await this.prisma.expense.findFirst({
            where: { id },
            include: {
                category: true,
                vendor: true
            }
        });
        if (!expense) {
            throw new common_1.NotFoundException('Expense not found');
        }
        return expense;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        if (updateDto.categoryId) {
            const category = await this.prisma.expenseCategory.findUnique({
                where: { id: updateDto.categoryId }
            });
            if (!category) {
                throw new common_1.NotFoundException('Expense Category not found');
            }
        }
        if (updateDto.vendorId) {
            const vendor = await this.prisma.vendor.findUnique({
                where: { id: updateDto.vendorId }
            });
            if (!vendor) {
                throw new common_1.NotFoundException('Vendor not found');
            }
        }
        return this.prisma.expense.update({
            where: { id },
            data: updateDto,
            include: {
                category: true,
                vendor: true
            }
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.expense.delete({
            where: { id }
        });
    }
    async getReport(startDate, endDate) {
        const where = {
            status: 'PAID',
        };
        if (startDate || endDate) {
            where.expenseDate = {};
            if (startDate) {
                where.expenseDate.gte = new Date(startDate);
            }
            if (endDate) {
                where.expenseDate.lte = new Date(endDate);
            }
        }
        const categoryAggregation = await this.prisma.expense.groupBy({
            by: ['categoryId'],
            where,
            _sum: {
                amount: true
            }
        });
        const categoryIds = categoryAggregation.map((c) => c.categoryId);
        const categories = await this.prisma.expenseCategory.findMany({
            where: { id: { in: categoryIds } },
            select: { id: true, name: true }
        });
        const categoryMap = new Map(categories.map((c) => [c.id, c.name]));
        const reportByCategory = categoryAggregation.map((item) => ({
            categoryId: item.categoryId,
            categoryName: categoryMap.get(item.categoryId) || 'Unknown',
            totalAmount: item._sum.amount || 0
        }));
        return {
            period: {
                startDate,
                endDate
            },
            totalExpenses: reportByCategory.reduce((sum, item) => sum + item.totalAmount, 0),
            byCategory: reportByCategory
        };
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map