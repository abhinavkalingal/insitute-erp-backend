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
exports.IdCardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma.service");
let IdCardsService = class IdCardsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTemplate(data) {
        return this.prisma.idCardTemplate.create({ data });
    }
    async getTemplates() {
        return this.prisma.idCardTemplate.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async getTemplateById(id) {
        const template = await this.prisma.idCardTemplate.findUnique({ where: { id } });
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        return template;
    }
    async updateTemplate(id, data) {
        return this.prisma.idCardTemplate.update({
            where: { id },
            data,
        });
    }
    async deleteTemplate(id) {
        return this.prisma.idCardTemplate.delete({
            where: { id },
        });
    }
};
exports.IdCardsService = IdCardsService;
exports.IdCardsService = IdCardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IdCardsService);
//# sourceMappingURL=id-cards.service.js.map