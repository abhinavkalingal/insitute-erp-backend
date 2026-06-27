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
exports.TelecallerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
let TelecallerService = class TelecallerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createLead(data) {
        return this.prisma.lead.create({
            data,
        });
    }
    async getLeads() {
        return this.prisma.lead.findMany({
            include: {
                followUps: {
                    orderBy: { date: 'desc' },
                    take: 1,
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getLeadById(id) {
        const lead = await this.prisma.lead.findUnique({
            where: { id },
            include: {
                followUps: {
                    orderBy: { date: 'desc' },
                },
            },
        });
        if (!lead) {
            throw new common_1.NotFoundException(`Lead with ID ${id} not found`);
        }
        return lead;
    }
    async updateLeadStatus(id, status) {
        return this.prisma.lead.update({
            where: { id },
            data: { status },
        });
    }
    async addFollowUp(leadId, data) {
        return this.prisma.followUp.create({
            data: {
                ...data,
                lead: { connect: { id: leadId } },
            },
        });
    }
    async deleteLead(id) {
        return this.prisma.lead.delete({
            where: { id },
        });
    }
    async bulkAssignLeads(leadIds, assigneeId) {
        return this.prisma.lead.updateMany({
            where: { id: { in: leadIds } },
            data: { assignedTo: assigneeId },
        });
    }
};
exports.TelecallerService = TelecallerService;
exports.TelecallerService = TelecallerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TelecallerService);
//# sourceMappingURL=telecaller.service.js.map