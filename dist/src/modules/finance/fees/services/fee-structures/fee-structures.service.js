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
exports.FeeStructuresService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let FeeStructuresService = class FeeStructuresService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const { installments, ...structureData } = createDto;
        const category = await this.prisma.feeCategory.findUnique({
            where: { id: structureData.categoryId }
        });
        if (!category) {
            throw new common_1.NotFoundException('Fee Category not found');
        }
        return this.prisma.feeStructure.create({
            data: {
                ...structureData,
                installments: installments
                    ? {
                        create: installments
                    }
                    : undefined
            },
            include: {
                installments: true
            }
        });
    }
    async findAll(queryOptions) {
        const where = {};
        if (queryOptions.search) {
            where.name = { contains: queryOptions.search, mode: 'insensitive' };
        }
        if (queryOptions.categoryId) {
            where.categoryId = queryOptions.categoryId;
        }
        const itemCount = await this.prisma.feeStructure.count({ where });
        const structures = await this.prisma.feeStructure.findMany({
            where,
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take,
            include: {
                category: { select: { name: true } },
                installments: true
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(structures, pageMetaDto);
    }
    async findOne(id) {
        const structure = await this.prisma.feeStructure.findFirst({
            where: { id },
            include: {
                category: true,
                installments: true
            }
        });
        if (!structure) {
            throw new common_1.NotFoundException('Fee Structure not found');
        }
        return structure;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        const { installments, ...structureData } = updateDto;
        if (structureData.categoryId) {
            const category = await this.prisma.feeCategory.findUnique({
                where: { id: structureData.categoryId }
            });
            if (!category) {
                throw new common_1.NotFoundException('Fee Category not found');
            }
        }
        if (installments) {
            await this.prisma.installmentPlan.deleteMany({
                where: { feeStructureId: id }
            });
        }
        return this.prisma.feeStructure.update({
            where: { id },
            data: {
                ...structureData,
                installments: installments
                    ? {
                        create: installments
                    }
                    : undefined
            },
            include: {
                installments: true
            }
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.feeStructure.delete({
            where: { id }
        });
    }
};
exports.FeeStructuresService = FeeStructuresService;
exports.FeeStructuresService = FeeStructuresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FeeStructuresService);
//# sourceMappingURL=fee-structures.service.js.map