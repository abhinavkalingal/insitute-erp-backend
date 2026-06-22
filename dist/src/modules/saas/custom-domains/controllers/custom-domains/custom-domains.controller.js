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
exports.CustomDomainsController = void 0;
const current_institute_decorator_1 = require("../../../../../core/decorators/current-institute.decorator");
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const custom_domain_dto_1 = require("../../dto/custom-domain.dto");
const custom_domains_service_1 = require("../../services/custom-domains/custom-domains.service");
let CustomDomainsController = class CustomDomainsController {
    customDomainsService;
    constructor(customDomainsService) {
        this.customDomainsService = customDomainsService;
    }
    getDomain(instituteId) {
        return this.customDomainsService.getDomain(instituteId);
    }
    registerDomain(instituteId, dto) {
        return this.customDomainsService.registerDomain(instituteId, dto);
    }
    verifyDomain(instituteId) {
        return this.customDomainsService.verifyDomain(instituteId);
    }
    removeDomain(instituteId) {
        return this.customDomainsService.removeDomain(instituteId);
    }
};
exports.CustomDomainsController = CustomDomainsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:branding'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current custom domain status and verification code' }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomDomainsController.prototype, "getDomain", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('update:branding'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new custom domain' }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, custom_domain_dto_1.RegisterCustomDomainDto]),
    __metadata("design:returntype", void 0)
], CustomDomainsController.prototype, "registerDomain", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, permissions_decorator_1.RequirePermissions)('update:branding'),
    (0, swagger_1.ApiOperation)({ summary: 'Trigger a manual DNS verification check' }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomDomainsController.prototype, "verifyDomain", null);
__decorate([
    (0, common_1.Delete)(),
    (0, permissions_decorator_1.RequirePermissions)('update:branding'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove the custom domain mapping' }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomDomainsController.prototype, "removeDomain", null);
exports.CustomDomainsController = CustomDomainsController = __decorate([
    (0, swagger_1.ApiTags)('SaaS / Custom Domains'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('saas/custom-domains'),
    __metadata("design:paramtypes", [custom_domains_service_1.CustomDomainsService])
], CustomDomainsController);
//# sourceMappingURL=custom-domains.controller.js.map