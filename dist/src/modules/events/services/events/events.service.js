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
exports.EventsService = void 0;
const page_dto_1 = require("../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let EventsService = class EventsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const category = await this.prisma.eventCategory.findUnique({
            where: { id: createDto.categoryId }
        });
        if (!category) {
            throw new common_1.NotFoundException('Event Category not found');
        }
        return this.prisma.event.create({
            data: {
                ...createDto
            }
        });
    }
    async findAll(queryOptions) {
        const where = {};
        if (queryOptions.search) {
            where.title = { contains: queryOptions.search, mode: 'insensitive' };
        }
        if (queryOptions.categoryId) {
            where.categoryId = queryOptions.categoryId;
        }
        if (queryOptions.status) {
            where.status = queryOptions.status;
        }
        const itemCount = await this.prisma.event.count({ where });
        const events = await this.prisma.event.findMany({
            where,
            orderBy: { startDate: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take,
            include: {
                category: { select: { name: true } },
                _count: { select: { participants: true } }
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(events, pageMetaDto);
    }
    async findOne(id) {
        const event = await this.prisma.event.findFirst({
            where: { id },
            include: {
                category: { select: { name: true } },
                _count: { select: { participants: true } }
            }
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        return event;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        if (updateDto.categoryId) {
            const category = await this.prisma.eventCategory.findUnique({
                where: { id: updateDto.categoryId }
            });
            if (!category) {
                throw new common_1.NotFoundException('Event Category not found');
            }
        }
        return this.prisma.event.update({
            where: { id },
            data: updateDto
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.event.delete({
            where: { id }
        });
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
//# sourceMappingURL=events.service.js.map