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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("./dashboard.service");
const passport_1 = require("@nestjs/passport");
let DashboardController = class DashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getReceptionDashboard() {
        return this.dashboardService.getReceptionDashboard();
    }
    async getOperationsDashboard() {
        return this.dashboardService.getOperationsDashboard();
    }
    async getMarketingDashboard() {
        return this.dashboardService.getMarketingDashboard();
    }
    async getDirectorDashboard() {
        return this.dashboardService.getDirectorDashboard();
    }
    async getFinanceDashboard() {
        return this.dashboardService.getFinanceDashboard();
    }
    async getHrDashboard() {
        return this.dashboardService.getHrDashboard();
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('reception'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getReceptionDashboard", null);
__decorate([
    (0, common_1.Get)('operations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getOperationsDashboard", null);
__decorate([
    (0, common_1.Get)('marketing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getMarketingDashboard", null);
__decorate([
    (0, common_1.Get)('director'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDirectorDashboard", null);
__decorate([
    (0, common_1.Get)('finance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getFinanceDashboard", null);
__decorate([
    (0, common_1.Get)('hr'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getHrDashboard", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('api/v1/dashboard'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map