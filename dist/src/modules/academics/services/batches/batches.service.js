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
exports.BatchesService = void 0;
const page_dto_1 = require("../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let BatchesService = class BatchesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        return this.prisma.batch.create({
            data: {
                ...createDto
            }
        });
    }
    async findAll(queryOptions) {
        const where = {
            deletedAt: null
        };
        if (queryOptions.courseId)
            where.courseId = queryOptions.courseId;
        if (queryOptions.branchId)
            where.branchId = queryOptions.branchId;
        if (queryOptions.isActive !== undefined) {
            where.isActive = queryOptions.isActive === 'true';
        }
        if (queryOptions.search) {
            where.OR = [{ name: { contains: queryOptions.search, mode: 'insensitive' } }];
        }
        const itemCount = await this.prisma.batch.count({ where });
        const batches = await this.prisma.batch.findMany({
            where,
            include: {
                course: { select: { name: true, code: true } },
                academicYear: { select: { name: true } },
                branch: { select: { name: true } }
            },
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(batches, pageMetaDto);
    }
    async findOne(id) {
        const batch = await this.prisma.batch.findFirst({
            where: { id, deletedAt: null },
            include: {
                course: { select: { name: true, code: true } },
                academicYear: { select: { name: true } },
                branch: { select: { name: true } }
            }
        });
        if (!batch) {
            throw new common_1.NotFoundException(`Batch not found`);
        }
        return batch;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.batch.update({
            where: { id },
            data: updateDto
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.batch.update({
            where: { id },
            data: { deletedAt: new Date(), isActive: false }
        });
    }
};
exports.BatchesService = BatchesService;
exports.BatchesService = BatchesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BatchesService);
//# sourceMappingURL=batches.service.js.map