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
exports.MaterialsService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let MaterialsService = class MaterialsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        return this.prisma.studyMaterial.create({
            data: {
                ...createDto
            }
        });
    }
    async findAll(queryOptions) {
        const where = {
            deletedAt: null
        };
        if (queryOptions.categoryId)
            where.categoryId = queryOptions.categoryId;
        if (queryOptions.subjectId)
            where.subjectId = queryOptions.subjectId;
        if (queryOptions.courseId)
            where.courseId = queryOptions.courseId;
        if (queryOptions.batchId)
            where.batchId = queryOptions.batchId;
        if (queryOptions.staffId)
            where.staffId = queryOptions.staffId;
        if (queryOptions.search) {
            where.title = { contains: queryOptions.search, mode: 'insensitive' };
        }
        const itemCount = await this.prisma.studyMaterial.count({ where });
        const materials = await this.prisma.studyMaterial.findMany({
            where,
            include: {
                category: { select: { name: true } },
                staff: { include: { user: { select: { firstName: true, lastName: true } } } },
                subject: { select: { name: true } }
            },
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(materials, pageMetaDto);
    }
    async findOne(id) {
        const material = await this.prisma.studyMaterial.findFirst({
            where: { id, deletedAt: null },
            include: {
                category: true,
                staff: { include: { user: { select: { firstName: true, lastName: true } } } },
                subject: { select: { name: true, code: true } },
                course: { select: { name: true } },
                batch: { select: { name: true } }
            }
        });
        if (!material) {
            throw new common_1.NotFoundException(`Study Material not found`);
        }
        return material;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.studyMaterial.update({
            where: { id },
            data: updateDto
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.studyMaterial.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
};
exports.MaterialsService = MaterialsService;
exports.MaterialsService = MaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MaterialsService);
//# sourceMappingURL=materials.service.js.map