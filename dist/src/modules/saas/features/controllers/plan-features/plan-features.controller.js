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
exports.PlanFeaturesController = void 0;
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const plan_feature_dto_1 = require("../../dto/plan-feature.dto");
const plan_features_service_1 = require("../../services/plan-features/plan-features.service");
let PlanFeaturesController = class PlanFeaturesController {
    planFeaturesService;
    constructor(planFeaturesService) {
        this.planFeaturesService = planFeaturesService;
    }
    assignFeature(planId, assignDto) {
        return this.planFeaturesService.assignFeatureToPlan(planId, assignDto);
    }
    getPlanFeatures(planId) {
        return this.planFeaturesService.getPlanFeatures(planId);
    }
    updatePlanFeature(planId, featureId, updateDto) {
        return this.planFeaturesService.updatePlanFeature(planId, featureId, updateDto);
    }
    removePlanFeature(planId, featureId) {
        return this.planFeaturesService.removePlanFeature(planId, featureId);
    }
};
exports.PlanFeaturesController = PlanFeaturesController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign a feature to a subscription plan' }),
    __param(0, (0, common_1.Param)('planId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, plan_feature_dto_1.AssignPlanFeatureDto]),
    __metadata("design:returntype", void 0)
], PlanFeaturesController.prototype, "assignFeature", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all features assigned to a specific plan (Public)' }),
    __param(0, (0, common_1.Param)('planId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlanFeaturesController.prototype, "getPlanFeatures", null);
__decorate([
    (0, common_1.Patch)(':featureId'),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Update the limit or toggle for a feature on a plan' }),
    __param(0, (0, common_1.Param)('planId')),
    __param(1, (0, common_1.Param)('featureId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, plan_feature_dto_1.UpdatePlanFeatureDto]),
    __metadata("design:returntype", void 0)
], PlanFeaturesController.prototype, "updatePlanFeature", null);
__decorate([
    (0, common_1.Delete)(':featureId'),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a feature from a subscription plan' }),
    __param(0, (0, common_1.Param)('planId')),
    __param(1, (0, common_1.Param)('featureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PlanFeaturesController.prototype, "removePlanFeature", null);
exports.PlanFeaturesController = PlanFeaturesController = __decorate([
    (0, swagger_1.ApiTags)('SaaS / Plan Features'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('saas/subscription-plans/:planId/features'),
    __metadata("design:paramtypes", [plan_features_service_1.PlanFeaturesService])
], PlanFeaturesController);
//# sourceMappingURL=plan-features.controller.js.map