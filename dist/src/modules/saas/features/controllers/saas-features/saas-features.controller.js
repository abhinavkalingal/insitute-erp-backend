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
exports.SaasFeaturesController = void 0;
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const saas_feature_dto_1 = require("../../dto/saas-feature.dto");
const saas_features_service_1 = require("../../services/saas-features/saas-features.service");
let SaasFeaturesController = class SaasFeaturesController {
    saasFeaturesService;
    constructor(saasFeaturesService) {
        this.saasFeaturesService = saasFeaturesService;
    }
    create(createDto) {
        return this.saasFeaturesService.create(createDto);
    }
    findAll(queryOptions) {
        return this.saasFeaturesService.findAll(queryOptions);
    }
    findOne(id) {
        return this.saasFeaturesService.findOne(id);
    }
    update(id, updateDto) {
        return this.saasFeaturesService.update(id, updateDto);
    }
    remove(id) {
        return this.saasFeaturesService.remove(id);
    }
};
exports.SaasFeaturesController = SaasFeaturesController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new feature in the global SaaS catalog' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [saas_feature_dto_1.CreateSaasFeatureDto]),
    __metadata("design:returntype", void 0)
], SaasFeaturesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all global SaaS features' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(saas_feature_dto_1.CreateSaasFeatureDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [saas_feature_dto_1.SaasFeatureQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], SaasFeaturesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific SaaS feature by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaasFeaturesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a SaaS feature' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, saas_feature_dto_1.UpdateSaasFeatureDto]),
    __metadata("design:returntype", void 0)
], SaasFeaturesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a SaaS feature' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaasFeaturesController.prototype, "remove", null);
exports.SaasFeaturesController = SaasFeaturesController = __decorate([
    (0, swagger_1.ApiTags)('SaaS / Features Catalog'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('saas/features'),
    __metadata("design:paramtypes", [saas_features_service_1.SaasFeaturesService])
], SaasFeaturesController);
//# sourceMappingURL=saas-features.controller.js.map