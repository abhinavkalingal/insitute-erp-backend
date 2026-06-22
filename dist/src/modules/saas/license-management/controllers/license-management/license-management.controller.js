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
exports.LicenseManagementController = void 0;
const current_institute_decorator_1 = require("../../../../../core/decorators/current-institute.decorator");
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const register_device_dto_1 = require("../../dto/register-device.dto");
const license_management_service_1 = require("../../services/license-management/license-management.service");
let LicenseManagementController = class LicenseManagementController {
    licenseManagementService;
    constructor(licenseManagementService) {
        this.licenseManagementService = licenseManagementService;
    }
    registerDevice(instituteId, req, dto) {
        const userId = req.user.id;
        return this.licenseManagementService.registerDevice(instituteId, userId, dto);
    }
    listDevices(targetUserId) {
        return this.licenseManagementService.listDevices(targetUserId);
    }
    revokeDevice(id) {
        return this.licenseManagementService.revokeDevice(id);
    }
};
exports.LicenseManagementController = LicenseManagementController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({
        summary: 'Register the current device session. Will throw 403 if Institute limit is reached.'
    }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __param(1, (0, common_2.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, register_device_dto_1.RegisterDeviceDto]),
    __metadata("design:returntype", void 0)
], LicenseManagementController.prototype, "registerDevice", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'List all devices registered across the institute' }),
    (0, swagger_1.ApiQuery)({ name: 'userId', required: false, description: 'Filter by specific user ID' }),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LicenseManagementController.prototype, "listDevices", null);
__decorate([
    (0, common_1.Patch)(':id/revoke'),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Forcefully revoke a device, freeing up a license slot' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LicenseManagementController.prototype, "revokeDevice", null);
exports.LicenseManagementController = LicenseManagementController = __decorate([
    (0, swagger_1.ApiTags)('SaaS / License Management'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('saas/licenses/devices'),
    __metadata("design:paramtypes", [license_management_service_1.LicenseManagementService])
], LicenseManagementController);
//# sourceMappingURL=license-management.controller.js.map