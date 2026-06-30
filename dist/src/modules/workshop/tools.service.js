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
exports.ToolsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
let ToolsService = class ToolsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTool(data) {
        return this.prisma.toolAsset.create({ data });
    }
    async getTools() {
        return this.prisma.toolAsset.findMany({
            include: {
                issuances: {
                    where: { returnedAt: null },
                },
            },
            orderBy: { name: 'asc' },
        });
    }
    async getToolByBarcode(barcode) {
        const tool = await this.prisma.toolAsset.findUnique({
            where: { barcode },
            include: {
                issuances: {
                    where: { returnedAt: null },
                },
            },
        });
        if (!tool)
            throw new common_1.NotFoundException('Tool not found');
        return tool;
    }
    async issueTool(barcode, assignedToUser) {
        return this.prisma.$transaction(async (tx) => {
            const tool = await tx.toolAsset.findUnique({ where: { barcode } });
            if (!tool)
                throw new common_1.NotFoundException('Tool not found');
            if (tool.status === 'ISSUED') {
                throw new common_1.BadRequestException('Tool is already issued out');
            }
            if (tool.status === 'MAINTENANCE') {
                throw new common_1.BadRequestException('Tool is under maintenance');
            }
            await tx.toolAsset.update({
                where: { id: tool.id },
                data: { status: 'ISSUED' },
            });
            return tx.toolIssuance.create({
                data: {
                    toolId: tool.id,
                    assignedToUser,
                },
            });
        });
    }
    async returnTool(barcode) {
        return this.prisma.$transaction(async (tx) => {
            const tool = await tx.toolAsset.findUnique({
                where: { barcode },
                include: {
                    issuances: {
                        where: { returnedAt: null },
                    },
                },
            });
            if (!tool)
                throw new common_1.NotFoundException('Tool not found');
            if (tool.status !== 'ISSUED' || tool.issuances.length === 0) {
                throw new common_1.BadRequestException('Tool is not currently issued');
            }
            const activeIssuance = tool.issuances[0];
            await tx.toolIssuance.update({
                where: { id: activeIssuance.id },
                data: { returnedAt: new Date() },
            });
            return tx.toolAsset.update({
                where: { id: tool.id },
                data: { status: 'AVAILABLE' },
            });
        });
    }
};
exports.ToolsService = ToolsService;
exports.ToolsService = ToolsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ToolsService);
//# sourceMappingURL=tools.service.js.map