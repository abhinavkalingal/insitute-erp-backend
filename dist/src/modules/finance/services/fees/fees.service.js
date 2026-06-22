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
exports.FeesService = void 0;
const page_dto_1 = require("../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let FeesService = class FeesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCategory(createDto) {
        return this.prisma.feeCategory.create({
            data: {
                ...createDto
            }
        });
    }
    async findAllCategories(queryOptions) {
        const where = {};
        if (queryOptions.search) {
            where.name = { contains: queryOptions.search, mode: 'insensitive' };
        }
        const itemCount = await this.prisma.feeCategory.count({ where });
        const categories = await this.prisma.feeCategory.findMany({
            where,
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(categories, pageMetaDto);
    }
    async findOneCategory(id) {
        const category = await this.prisma.feeCategory.findFirst({
            where: { id }
        });
        if (!category)
            throw new common_1.NotFoundException('Fee Category not found');
        return category;
    }
    async updateCategory(id, updateDto) {
        await this.findOneCategory(id);
        return this.prisma.feeCategory.update({ where: { id }, data: updateDto });
    }
    async removeCategory(id) {
        await this.findOneCategory(id);
        return this.prisma.feeCategory.delete({ where: { id } });
    }
    async createStructure(createDto) {
        await this.findOneCategory(createDto.categoryId);
        return this.prisma.feeStructure.create({
            data: {
                ...createDto
            }
        });
    }
    async findAllStructures(queryOptions) {
        const where = {};
        if (queryOptions.categoryId)
            where.categoryId = queryOptions.categoryId;
        if (queryOptions.courseId)
            where.courseId = queryOptions.courseId;
        if (queryOptions.batchId)
            where.batchId = queryOptions.batchId;
        if (queryOptions.search) {
            where.name = { contains: queryOptions.search, mode: 'insensitive' };
        }
        const itemCount = await this.prisma.feeStructure.count({ where });
        const structures = await this.prisma.feeStructure.findMany({
            where,
            include: {
                category: { select: { name: true } },
                course: { select: { name: true } },
                batch: { select: { name: true } }
            },
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(structures, pageMetaDto);
    }
    async findOneStructure(id) {
        const structure = await this.prisma.feeStructure.findFirst({
            where: { id },
            include: {
                category: { select: { name: true } },
                course: { select: { name: true } },
                batch: { select: { name: true } }
            }
        });
        if (!structure)
            throw new common_1.NotFoundException('Fee Structure not found');
        return structure;
    }
    async updateStructure(id, updateDto) {
        await this.findOneStructure(id);
        return this.prisma.feeStructure.update({ where: { id }, data: updateDto });
    }
    async removeStructure(id) {
        await this.findOneStructure(id);
        return this.prisma.feeStructure.delete({ where: { id } });
    }
};
exports.FeesService = FeesService;
exports.FeesService = FeesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FeesService);
//# sourceMappingURL=fees.service.js.map