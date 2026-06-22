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
exports.AuditLogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
let AuditLogsService = class AuditLogsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    buildWhereClause(type, query) {
        const where = {
            type
        };
        if (query.userId) {
            where.userId = query.userId;
        }
        if (query.action) {
            where.action = query.action;
        }
        if (query.startDate || query.endDate) {
            where.createdAt = {};
            if (query.startDate)
                where.createdAt.gte = new Date(query.startDate);
            if (query.endDate)
                where.createdAt.lte = new Date(query.endDate);
        }
        return where;
    }
    async findActivityLogs(query) {
        const where = {};
        if (query.userId)
            where.userId = query.userId;
        if (query.action)
            where.action = query.action;
        if (query.startDate || query.endDate) {
            where.createdAt = {};
            if (query.startDate)
                where.createdAt.gte = new Date(query.startDate);
            if (query.endDate)
                where.createdAt.lte = new Date(query.endDate);
        }
        return this.prisma.auditLog.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: 100,
            include: { user: { select: { email: true, firstName: true, lastName: true } } }
        });
    }
    async findLoginHistory(query) {
        return this.prisma.auditLog.findMany({
            where: this.buildWhereClause('LOGIN_HISTORY', query),
            orderBy: { createdAt: 'desc' },
            take: 100,
            include: { user: { select: { email: true, firstName: true, lastName: true } } }
        });
    }
    async findDataChanges(query) {
        return this.prisma.auditLog.findMany({
            where: this.buildWhereClause('DATA_CHANGE', query),
            orderBy: { createdAt: 'desc' },
            take: 100,
            include: { user: { select: { email: true, firstName: true, lastName: true } } }
        });
    }
    async findSecurityEvents(query) {
        return this.prisma.auditLog.findMany({
            where: {
                ...this.buildWhereClause('SECURITY_EVENT', query),
                OR: [
                    { type: 'SECURITY_EVENT' },
                    { type: 'SYSTEM_EVENT' },
                ]
            },
            orderBy: { createdAt: 'desc' },
            take: 100,
            include: { user: { select: { email: true, firstName: true, lastName: true } } }
        });
    }
    async findByEntity(entity, entityId) {
        return this.prisma.auditLog.findMany({
            where: { entity, entityId },
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { email: true, firstName: true, lastName: true } } }
        });
    }
};
exports.AuditLogsService = AuditLogsService;
exports.AuditLogsService = AuditLogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuditLogsService);
//# sourceMappingURL=audit-logs.service.js.map