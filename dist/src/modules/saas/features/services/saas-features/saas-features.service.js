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
exports.SaasFeaturesService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_master_service_1 = require("../../../../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
let SaasFeaturesService = class SaasFeaturesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const existing = await this.prisma.saasFeature.findUnique({
            where: { key: createDto.key }
        });
        if (existing) {
            throw new common_1.ConflictException(`SaasFeature with key ${createDto.key} already exists`);
        }
        return this.prisma.saasFeature.create({
            data: createDto
        });
    }
    async findAll(queryOptions) {
        const where = {};
        if (queryOptions.type) {
            where.type = queryOptions.type;
        }
        if (queryOptions.search) {
            where.OR = [
                { name: { contains: queryOptions.search, mode: 'insensitive' } },
                { key: { contains: queryOptions.search, mode: 'insensitive' } },
            ];
        }
        const itemCount = await this.prisma.saasFeature.count({ where });
        const features = await this.prisma.saasFeature.findMany({
            where,
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(features, pageMetaDto);
    }
    async findOne(id) {
        const feature = await this.prisma.saasFeature.findUnique({
            where: { id }
        });
        if (!feature) {
            throw new common_1.NotFoundException('SaasFeature not found');
        }
        return feature;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        if (updateDto.key) {
            const existing = await this.prisma.saasFeature.findFirst({
                where: { key: updateDto.key, id: { not: id } }
            });
            if (existing) {
                throw new common_1.ConflictException(`SaasFeature with key ${updateDto.key} already exists`);
            }
        }
        return this.prisma.saasFeature.update({
            where: { id },
            data: updateDto
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.saasFeature.delete({
            where: { id }
        });
    }
};
exports.SaasFeaturesService = SaasFeaturesService;
exports.SaasFeaturesService = SaasFeaturesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_master_service_1.PrismaMasterService])
], SaasFeaturesService);
//# sourceMappingURL=saas-features.service.js.map