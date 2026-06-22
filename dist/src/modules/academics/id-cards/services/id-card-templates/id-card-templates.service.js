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
exports.IdCardTemplatesService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let IdCardTemplatesService = class IdCardTemplatesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        return this.prisma.idCardTemplate.create({
            data: {
                ...createDto
            }
        });
    }
    async findAll(queryOptions) {
        const where = {};
        if (queryOptions.search) {
            where.name = { contains: queryOptions.search, mode: 'insensitive' };
        }
        if (queryOptions.roleType) {
            where.roleType = queryOptions.roleType;
        }
        const itemCount = await this.prisma.idCardTemplate.count({ where });
        const templates = await this.prisma.idCardTemplate.findMany({
            where,
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take,
            include: {
                _count: { select: { issued: true } }
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(templates, pageMetaDto);
    }
    async findOne(id) {
        const template = await this.prisma.idCardTemplate.findFirst({
            where: { id }
        });
        if (!template) {
            throw new common_1.NotFoundException('ID Card Template not found');
        }
        return template;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.idCardTemplate.update({
            where: { id },
            data: updateDto
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.idCardTemplate.delete({
            where: { id }
        });
    }
};
exports.IdCardTemplatesService = IdCardTemplatesService;
exports.IdCardTemplatesService = IdCardTemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IdCardTemplatesService);
//# sourceMappingURL=id-card-templates.service.js.map