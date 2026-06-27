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
exports.ReceptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
let ReceptionService = class ReceptionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createVisitor(data) {
        return this.prisma.visitor.create({ data });
    }
    async getVisitors() {
        return this.prisma.visitor.findMany({
            orderBy: { checkInAt: 'desc' },
        });
    }
    async updateVisitor(id, data) {
        return this.prisma.visitor.update({
            where: { id },
            data,
        });
    }
    async deleteVisitor(id) {
        return this.prisma.visitor.delete({
            where: { id },
        });
    }
    async createEnquiry(data) {
        return this.prisma.enquiry.create({ data });
    }
    async getEnquiries() {
        return this.prisma.enquiry.findMany({
            include: { course: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateEnquiry(id, data) {
        return this.prisma.enquiry.update({
            where: { id },
            data,
        });
    }
    async deleteEnquiry(id) {
        return this.prisma.enquiry.delete({
            where: { id },
        });
    }
    async createAppointment(data) {
        return this.prisma.appointment.create({ data });
    }
    async getAppointments() {
        return this.prisma.appointment.findMany({
            orderBy: { date: 'asc' },
        });
    }
    async updateAppointment(id, data) {
        return this.prisma.appointment.update({
            where: { id },
            data,
        });
    }
    async deleteAppointment(id) {
        return this.prisma.appointment.delete({
            where: { id },
        });
    }
};
exports.ReceptionService = ReceptionService;
exports.ReceptionService = ReceptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReceptionService);
//# sourceMappingURL=reception.service.js.map