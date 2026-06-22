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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const permissions_decorator_1 = require("../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../core/guards/permissions.guard");
const audit_logs_service_1 = require("./audit-logs.service");
const audit_log_query_dto_1 = require("./dto/audit-log-query.dto");
let AuditLogsController = class AuditLogsController {
    auditLogsService;
    constructor(auditLogsService) {
        this.auditLogsService = auditLogsService;
    }
    findActivityLogs(query) {
        return this.auditLogsService.findActivityLogs(query);
    }
    findLoginHistory(query) {
        return this.auditLogsService.findLoginHistory(query);
    }
    findDataChanges(query) {
        return this.auditLogsService.findDataChanges(query);
    }
    findSecurityEvents(query) {
        return this.auditLogsService.findSecurityEvents(query);
    }
    findByEntity(entity, entityId) {
        return this.auditLogsService.findByEntity(entity, entityId);
    }
};
exports.AuditLogsController = AuditLogsController;
__decorate([
    (0, common_1.Get)('activity'),
    (0, permissions_decorator_1.RequirePermissions)('read:audit-logs'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all user activity logs' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [audit_log_query_dto_1.AuditLogQueryDto]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "findActivityLogs", null);
__decorate([
    (0, common_1.Get)('logins'),
    (0, permissions_decorator_1.RequirePermissions)('read:audit-logs'),
    (0, swagger_1.ApiOperation)({ summary: 'Get login history' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [audit_log_query_dto_1.AuditLogQueryDto]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "findLoginHistory", null);
__decorate([
    (0, common_1.Get)('data-changes'),
    (0, permissions_decorator_1.RequirePermissions)('read:audit-logs'),
    (0, swagger_1.ApiOperation)({ summary: 'Get data change history' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [audit_log_query_dto_1.AuditLogQueryDto]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "findDataChanges", null);
__decorate([
    (0, common_1.Get)('security'),
    (0, permissions_decorator_1.RequirePermissions)('read:audit-logs'),
    (0, swagger_1.ApiOperation)({ summary: 'Get security and system events' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [audit_log_query_dto_1.AuditLogQueryDto]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "findSecurityEvents", null);
__decorate([
    (0, common_1.Get)(':entity/:entityId'),
    (0, permissions_decorator_1.RequirePermissions)('read:audit-logs'),
    (0, swagger_1.ApiOperation)({ summary: 'Get audit logs for a specific entity' }),
    __param(0, (0, common_1.Param)('entity')),
    __param(1, (0, common_1.Param)('entityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "findByEntity", null);
exports.AuditLogsController = AuditLogsController = __decorate([
    (0, swagger_1.ApiTags)('Audit Logs'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('audit-logs'),
    __metadata("design:paramtypes", [audit_logs_service_1.AuditLogsService])
], AuditLogsController);
//# sourceMappingURL=audit-logs.controller.js.map