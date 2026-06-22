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
exports.WhiteLabelController = void 0;
const current_institute_decorator_1 = require("../../../../../core/decorators/current-institute.decorator");
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const institute_branding_dto_1 = require("../../dto/institute-branding.dto");
const white_label_service_1 = require("../../services/white-label/white-label.service");
let WhiteLabelController = class WhiteLabelController {
    whiteLabelService;
    constructor(whiteLabelService) {
        this.whiteLabelService = whiteLabelService;
    }
    getPublicBrandingByDomain(domain) {
        return this.whiteLabelService.getPublicBrandingByDomain(domain);
    }
    getBranding(instituteId) {
        return this.whiteLabelService.getBranding(instituteId);
    }
    updateBranding(instituteId, updateDto) {
        return this.whiteLabelService.updateBranding(instituteId, updateDto);
    }
};
exports.WhiteLabelController = WhiteLabelController;
__decorate([
    (0, common_1.Get)('public/:domain'),
    (0, swagger_1.ApiOperation)({ summary: 'Get public branding settings by domain (No Auth Required)' }),
    __param(0, (0, common_1.Param)('domain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WhiteLabelController.prototype, "getPublicBrandingByDomain", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('read:branding'),
    (0, swagger_1.ApiOperation)({ summary: 'Get complete branding settings for the current institute' }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WhiteLabelController.prototype, "getBranding", null);
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('update:branding'),
    (0, swagger_1.ApiOperation)({ summary: 'Update branding settings for the current institute' }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, institute_branding_dto_1.UpdateInstituteBrandingDto]),
    __metadata("design:returntype", void 0)
], WhiteLabelController.prototype, "updateBranding", null);
exports.WhiteLabelController = WhiteLabelController = __decorate([
    (0, swagger_1.ApiTags)('SaaS / White Label'),
    (0, common_1.Controller)('saas/white-label'),
    __metadata("design:paramtypes", [white_label_service_1.WhiteLabelService])
], WhiteLabelController);
//# sourceMappingURL=white-label.controller.js.map