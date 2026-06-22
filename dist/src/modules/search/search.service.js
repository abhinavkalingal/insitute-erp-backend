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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
let SearchService = class SearchService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async globalSearch(q) {
        const query = q.toLowerCase();
        const limit = 5;
        const students = await this.prisma.student.findMany({
            where: {
                OR: [
                    { enrollmentNo: { contains: query, mode: 'insensitive' } },
                    { user: { firstName: { contains: query, mode: 'insensitive' } } },
                    { user: { lastName: { contains: query, mode: 'insensitive' } } },
                    { user: { email: { contains: query, mode: 'insensitive' } } },
                ]
            },
            include: { user: true },
            take: limit
        });
        const staff = await this.prisma.staff.findMany({
            where: {
                OR: [
                    { employeeId: { contains: query, mode: 'insensitive' } },
                    { user: { firstName: { contains: query, mode: 'insensitive' } } },
                    { user: { lastName: { contains: query, mode: 'insensitive' } } },
                    { user: { email: { contains: query, mode: 'insensitive' } } },
                ]
            },
            include: { user: true },
            take: limit
        });
        const courses = await this.prisma.course.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { code: { contains: query, mode: 'insensitive' } },
                ]
            },
            take: limit
        });
        const invoices = await this.prisma.invoice.findMany({
            where: {
                invoiceNumber: { contains: query, mode: 'insensitive' }
            },
            take: limit
        });
        const events = await this.prisma.event.findMany({
            where: {
                title: { contains: query, mode: 'insensitive' }
            },
            take: limit
        });
        const results = [];
        students.forEach((s) => {
            results.push({
                id: s.id,
                type: 'STUDENT',
                title: `${s.user.firstName} ${s.user.lastName}`,
                subtitle: `Enrollment: ${s.enrollmentNo || 'N/A'} | Email: ${s.user.email}`,
                url: `/students/${s.id}`
            });
        });
        staff.forEach((s) => {
            results.push({
                id: s.id,
                type: 'STAFF',
                title: `${s.user.firstName} ${s.user.lastName}`,
                subtitle: `Employee ID: ${s.employeeId} | Email: ${s.user.email}`,
                url: `/staff/${s.id}`
            });
        });
        courses.forEach((c) => {
            results.push({
                id: c.id,
                type: 'COURSE',
                title: c.name,
                subtitle: `Course Code: ${c.code}`,
                url: `/courses/${c.id}`
            });
        });
        invoices.forEach((inv) => {
            results.push({
                id: inv.id,
                type: 'INVOICE',
                title: `Invoice: ${inv.invoiceNumber}`,
                subtitle: `Amount: ${inv.totalAmount} | Status: ${inv.status}`,
                url: `/finance/invoices/${inv.id}`
            });
        });
        events.forEach((evt) => {
            results.push({
                id: evt.id,
                type: 'EVENT',
                title: evt.title,
                subtitle: `Date: ${evt.startDate.toISOString().split('T')[0]}`,
                url: `/events/${evt.id}`
            });
        });
        return results;
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SearchService);
//# sourceMappingURL=search.service.js.map