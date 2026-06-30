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
exports.MarketingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
const students_service_1 = require("../students/students.service");
let MarketingService = class MarketingService {
    prisma;
    studentsService;
    constructor(prisma, studentsService) {
        this.prisma = prisma;
        this.studentsService = studentsService;
    }
    async createCampaign(data) {
        return this.prisma.campaign.create({ data });
    }
    async getCampaigns() {
        return this.prisma.campaign.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateCampaign(id, data) {
        return this.prisma.campaign.update({
            where: { id },
            data,
        });
    }
    async deleteCampaign(id) {
        return this.prisma.campaign.delete({
            where: { id },
        });
    }
    async createLead(data) {
        return this.prisma.lead.create({ data });
    }
    async getLeads() {
        return this.prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateLead(id, data) {
        return this.prisma.lead.update({
            where: { id },
            data,
        });
    }
    async convertLeadToStudent(id, data) {
        const lead = await this.prisma.lead.findUnique({ where: { id } });
        if (!lead) {
            throw new Error('Lead not found');
        }
        const studentData = {
            firstName: lead.firstName,
            lastName: lead.lastName || '',
            email: lead.email || `${lead.firstName.toLowerCase()}.${Date.now()}@institute.com`,
            password: 'password123',
            branchId: data.branchId,
            courseId: data.courseId,
            batchId: data.batchId,
            admissionDate: new Date().toISOString(),
            profile: {
                phone: lead.phone,
                convertedFromLeadId: lead.id,
            },
        };
        const student = await this.studentsService.create(studentData);
        await this.prisma.lead.update({
            where: { id },
            data: { status: 'ENROLLED' },
        });
        return student;
    }
};
exports.MarketingService = MarketingService;
exports.MarketingService = MarketingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        students_service_1.StudentsService])
], MarketingService);
//# sourceMappingURL=marketing.service.js.map