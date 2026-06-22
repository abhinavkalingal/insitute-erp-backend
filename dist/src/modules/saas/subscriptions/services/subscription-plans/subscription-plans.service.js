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
exports.SubscriptionPlansService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_master_service_1 = require("../../../../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
let SubscriptionPlansService = class SubscriptionPlansService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        return this.prisma.subscriptionPlan.create({
            data: createDto
        });
    }
    async findAll(queryOptions) {
        const where = {};
        if (queryOptions.isActive !== undefined) {
            where.isActive = queryOptions.isActive;
        }
        if (queryOptions.search) {
            where.name = { contains: queryOptions.search, mode: 'insensitive' };
        }
        const itemCount = await this.prisma.subscriptionPlan.count({ where });
        const plans = await this.prisma.subscriptionPlan.findMany({
            where,
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(plans, pageMetaDto);
    }
    async findOne(id) {
        const plan = await this.prisma.subscriptionPlan.findUnique({
            where: { id }
        });
        if (!plan) {
            throw new common_1.NotFoundException('Subscription Plan not found');
        }
        return plan;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.subscriptionPlan.update({
            where: { id },
            data: updateDto
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.subscriptionPlan.update({
            where: { id },
            data: { isActive: false }
        });
    }
};
exports.SubscriptionPlansService = SubscriptionPlansService;
exports.SubscriptionPlansService = SubscriptionPlansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_master_service_1.PrismaMasterService])
], SubscriptionPlansService);
//# sourceMappingURL=subscription-plans.service.js.map