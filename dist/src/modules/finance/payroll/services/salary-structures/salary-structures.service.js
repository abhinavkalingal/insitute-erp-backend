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
exports.SalaryStructuresService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let SalaryStructuresService = class SalaryStructuresService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    calculateNetSalary(basicPay, allowances, deductions) {
        let net = basicPay;
        if (allowances && allowances.length > 0) {
            net += allowances.reduce((sum, item) => sum + item.amount, 0);
        }
        if (deductions && deductions.length > 0) {
            net -= deductions.reduce((sum, item) => sum + item.amount, 0);
        }
        return Math.max(0, net);
    }
    async create(createDto) {
        const existing = await this.prisma.salaryStructure.findUnique({
            where: { staffId: createDto.staffId }
        });
        if (existing) {
            throw new common_1.ConflictException('Salary structure already exists for this staff member');
        }
        const staff = await this.prisma.staff.findUnique({
            where: { id: createDto.staffId }
        });
        if (!staff) {
            throw new common_1.NotFoundException('Staff not found');
        }
        const netSalary = this.calculateNetSalary(createDto.basicPay, createDto.allowances, createDto.deductions);
        return this.prisma.salaryStructure.create({
            data: {
                staffId: createDto.staffId,
                basicPay: createDto.basicPay,
                allowances: createDto.allowances ? createDto.allowances : client_1.Prisma.JsonNull,
                deductions: createDto.deductions ? createDto.deductions : client_1.Prisma.JsonNull,
                netSalary
            }
        });
    }
    async findAll(queryOptions) {
        const where = {};
        if (queryOptions.staffId) {
            where.staffId = queryOptions.staffId;
        }
        const itemCount = await this.prisma.salaryStructure.count({ where });
        const structures = await this.prisma.salaryStructure.findMany({
            where,
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take,
            include: {
                staff: { include: { user: { select: { firstName: true, lastName: true } } } }
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(structures, pageMetaDto);
    }
    async findOne(id) {
        const structure = await this.prisma.salaryStructure.findFirst({
            where: { id },
            include: {
                staff: { include: { user: { select: { firstName: true, lastName: true } } } }
            }
        });
        if (!structure) {
            throw new common_1.NotFoundException('Salary Structure not found');
        }
        return structure;
    }
    async update(id, updateDto) {
        const existing = await this.findOne(id);
        const basicPay = updateDto.basicPay !== undefined ? updateDto.basicPay : existing.basicPay;
        const allowances = updateDto.allowances !== undefined
            ? updateDto.allowances
            : existing.allowances;
        const deductions = updateDto.deductions !== undefined
            ? updateDto.deductions
            : existing.deductions;
        const netSalary = this.calculateNetSalary(basicPay, allowances, deductions);
        const updateData = {
            netSalary
        };
        if (updateDto.basicPay !== undefined)
            updateData.basicPay = updateDto.basicPay;
        if (updateDto.allowances !== undefined)
            updateData.allowances = updateDto.allowances
                ? updateDto.allowances
                : client_1.Prisma.JsonNull;
        if (updateDto.deductions !== undefined)
            updateData.deductions = updateDto.deductions
                ? updateDto.deductions
                : client_1.Prisma.JsonNull;
        return this.prisma.salaryStructure.update({
            where: { id },
            data: updateData
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.salaryStructure.delete({
            where: { id }
        });
    }
};
exports.SalaryStructuresService = SalaryStructuresService;
exports.SalaryStructuresService = SalaryStructuresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SalaryStructuresService);
//# sourceMappingURL=salary-structures.service.js.map