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
exports.PlacementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
let PlacementsService = class PlacementsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCompany(data) {
        return this.prisma.company.create({ data });
    }
    async getCompanies() {
        return this.prisma.company.findMany({
            orderBy: { name: 'asc' },
        });
    }
    async updateCompany(id, data) {
        return this.prisma.company.update({
            where: { id },
            data,
        });
    }
    async deleteCompany(id) {
        return this.prisma.company.delete({
            where: { id },
        });
    }
    async createDrive(data) {
        return this.prisma.placementDrive.create({ data });
    }
    async getDrives() {
        return this.prisma.placementDrive.findMany({
            include: { company: true },
            orderBy: { date: 'desc' },
        });
    }
    async updateDrive(id, data) {
        return this.prisma.placementDrive.update({
            where: { id },
            data,
        });
    }
    async deleteDrive(id) {
        return this.prisma.placementDrive.delete({
            where: { id },
        });
    }
    async createJobPosting(data) {
        return this.prisma.jobPosting.create({ data });
    }
    async getJobPostings(driveId) {
        const where = driveId ? { driveId } : {};
        return this.prisma.jobPosting.findMany({
            where,
            include: {
                drive: {
                    include: { company: true },
                },
                _count: { select: { applications: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateJobPosting(id, data) {
        return this.prisma.jobPosting.update({
            where: { id },
            data,
        });
    }
    async deleteJobPosting(id) {
        return this.prisma.jobPosting.delete({
            where: { id },
        });
    }
    async createApplication(data) {
        return this.prisma.jobApplication.create({ data });
    }
    async getApplications(jobId) {
        return this.prisma.jobApplication.findMany({
            where: { jobPostingId: jobId },
            include: {
                student: {
                    include: {
                        user: true,
                    }
                }
            },
        });
    }
    async updateApplicationStatus(id, status) {
        return this.prisma.jobApplication.update({
            where: { id },
            data: { status },
        });
    }
};
exports.PlacementsService = PlacementsService;
exports.PlacementsService = PlacementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlacementsService);
//# sourceMappingURL=placements.service.js.map