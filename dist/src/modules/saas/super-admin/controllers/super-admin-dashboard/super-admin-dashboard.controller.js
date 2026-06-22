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
exports.SuperAdminDashboardController = void 0;
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const super_admin_dashboard_service_1 = require("../../services/super-admin-dashboard/super-admin-dashboard.service");
let SuperAdminDashboardController = class SuperAdminDashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    getDashboardData() {
        return this.dashboardService.getDashboardData();
    }
    getHealthData() {
        return this.dashboardService.getSystemHealth();
    }
};
exports.SuperAdminDashboardController = SuperAdminDashboardController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('manage:platform'),
    (0, swagger_1.ApiOperation)({ summary: 'Get global SaaS platform metrics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperAdminDashboardController.prototype, "getDashboardData", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, permissions_decorator_1.RequirePermissions)('manage:platform'),
    (0, swagger_1.ApiOperation)({ summary: 'Get real-time OS health metrics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperAdminDashboardController.prototype, "getHealthData", null);
exports.SuperAdminDashboardController = SuperAdminDashboardController = __decorate([
    (0, swagger_1.ApiTags)('SaaS / Super Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('saas/super-admin/dashboard'),
    __metadata("design:paramtypes", [super_admin_dashboard_service_1.SuperAdminDashboardService])
], SuperAdminDashboardController);
//# sourceMappingURL=super-admin-dashboard.controller.js.map