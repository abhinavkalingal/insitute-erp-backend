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
exports.GradesService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let GradesService = class GradesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        return this.prisma.gradeRule.create({
            data: {
                ...createDto
            }
        });
    }
    async findAll(queryOptions) {
        const where = {};
        const itemCount = await this.prisma.gradeRule.count({ where });
        const rules = await this.prisma.gradeRule.findMany({
            where,
            orderBy: { minPercent: 'desc' },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(rules, pageMetaDto);
    }
    async findOne(id) {
        const rule = await this.prisma.gradeRule.findFirst({
            where: { id }
        });
        if (!rule) {
            throw new common_1.NotFoundException(`Grade Rule not found`);
        }
        return rule;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.gradeRule.update({
            where: { id },
            data: updateDto
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.gradeRule.delete({
            where: { id }
        });
    }
};
exports.GradesService = GradesService;
exports.GradesService = GradesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GradesService);
//# sourceMappingURL=grades.service.js.map