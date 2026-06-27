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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const permissions_decorator_1 = require("../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../core/guards/permissions.guard");
const analytics_service_1 = require("./analytics.service");
const analytics_query_dto_1 = require("./dto/analytics-query.dto");
let AnalyticsController = class AnalyticsController {
    analyticsService;
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    getDashboardOverview(query) {
        return this.analyticsService.getDashboardOverview(query);
    }
    getStudentAnalytics(query) {
        return this.analyticsService.getStudentAnalytics(query);
    }
    getRevenueAnalytics(query) {
        return this.analyticsService.getRevenueAnalytics(query);
    }
    getAttendanceAnalytics(query) {
        return this.analyticsService.getAttendanceAnalytics(query);
    }
    getCourseAnalytics(query) {
        return this.analyticsService.getCourseAnalytics(query);
    }
    getFacultyAnalytics(query) {
        return this.analyticsService.getFacultyAnalytics(query);
    }
    getLeadAnalytics(query) {
        return this.analyticsService.getLeadAnalytics(query);
    }
    getOperationsAnalytics(query) {
        return this.analyticsService.getOperationsAnalytics(query);
    }
    getSystemAnalytics(query) {
        return this.analyticsService.getSystemAnalytics(query);
    }
    getAcademicAnalytics(query) {
        return this.analyticsService.getAcademicAnalytics(query);
    }
    getBranchAnalytics(query) {
        return this.analyticsService.getBranchAnalytics(query);
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get high-level dashboard overview' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_query_dto_1.AnalyticsQueryDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getDashboardOverview", null);
__decorate([
    (0, common_1.Get)('students'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student analytics' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_query_dto_1.AnalyticsQueryDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getStudentAnalytics", null);
__decorate([
    (0, common_1.Get)('revenue'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get revenue and financial analytics' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_query_dto_1.AnalyticsQueryDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getRevenueAnalytics", null);
__decorate([
    (0, common_1.Get)('attendance'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get attendance analytics' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_query_dto_1.AnalyticsQueryDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getAttendanceAnalytics", null);
__decorate([
    (0, common_1.Get)('courses'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get course and batch analytics' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_query_dto_1.AnalyticsQueryDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getCourseAnalytics", null);
__decorate([
    (0, common_1.Get)('faculty'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get faculty and staff analytics' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_query_dto_1.AnalyticsQueryDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getFacultyAnalytics", null);
__decorate([
    (0, common_1.Get)('leads'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lead and conversion analytics' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_query_dto_1.AnalyticsQueryDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getLeadAnalytics", null);
__decorate([
    (0, common_1.Get)('operations'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get operations and tickets analytics' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_query_dto_1.AnalyticsQueryDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getOperationsAnalytics", null);
__decorate([
    (0, common_1.Get)('system'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get system and infrastructure analytics' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_query_dto_1.AnalyticsQueryDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getSystemAnalytics", null);
__decorate([
    (0, common_1.Get)('academic'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get academic performance analytics' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_query_dto_1.AnalyticsQueryDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getAcademicAnalytics", null);
__decorate([
    (0, common_1.Get)('branch'),
    (0, permissions_decorator_1.RequirePermissions)('read:analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get branch performance analytics' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_query_dto_1.AnalyticsQueryDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getBranchAnalytics", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, swagger_1.ApiTags)('Analytics'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('analytics'),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map