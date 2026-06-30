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
exports.RepairTicketsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
let RepairTicketsService = class RepairTicketsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTicket(data) {
        return this.prisma.repairTicket.create({
            data: {
                ...data,
                logs: {
                    create: {
                        statusUpdate: 'RECEIVED',
                        notes: 'Device received from customer',
                        createdBy: 'SYSTEM',
                    }
                }
            },
            include: { logs: true }
        });
    }
    async getTickets() {
        return this.prisma.repairTicket.findMany({
            include: { logs: { orderBy: { createdAt: 'desc' } } },
            orderBy: { createdAt: 'desc' }
        });
    }
    async getTicketById(id) {
        const ticket = await this.prisma.repairTicket.findUnique({
            where: { id },
            include: { logs: { orderBy: { createdAt: 'desc' } } }
        });
        if (!ticket)
            throw new common_1.NotFoundException('Ticket not found');
        return ticket;
    }
    async updateTicketStatus(id, status, notes, userId) {
        return this.prisma.repairTicket.update({
            where: { id },
            data: {
                status,
                logs: {
                    create: {
                        statusUpdate: status,
                        notes,
                        createdBy: userId,
                    }
                }
            },
            include: { logs: { orderBy: { createdAt: 'desc' } } }
        });
    }
    async updateTicket(id, data) {
        return this.prisma.repairTicket.update({
            where: { id },
            data,
            include: { logs: true }
        });
    }
    async deleteTicket(id) {
        return this.prisma.repairTicket.delete({ where: { id } });
    }
};
exports.RepairTicketsService = RepairTicketsService;
exports.RepairTicketsService = RepairTicketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RepairTicketsService);
//# sourceMappingURL=repair-tickets.service.js.map