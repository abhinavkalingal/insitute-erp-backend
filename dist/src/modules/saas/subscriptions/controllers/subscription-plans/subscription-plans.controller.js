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
exports.SubscriptionPlansController = void 0;
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const subscription_plan_dto_1 = require("../../dto/subscription-plan.dto");
const subscription_plans_service_1 = require("../../services/subscription-plans/subscription-plans.service");
let SubscriptionPlansController = class SubscriptionPlansController {
    subscriptionPlansService;
    constructor(subscriptionPlansService) {
        this.subscriptionPlansService = subscriptionPlansService;
    }
    create(createDto) {
        return this.subscriptionPlansService.create(createDto);
    }
    findAll(queryOptions) {
        return this.subscriptionPlansService.findAll(queryOptions);
    }
    findOne(id) {
        return this.subscriptionPlansService.findOne(id);
    }
    update(id, updateDto) {
        return this.subscriptionPlansService.update(id, updateDto);
    }
    remove(id) {
        return this.subscriptionPlansService.remove(id);
    }
};
exports.SubscriptionPlansController = SubscriptionPlansController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new subscription plan' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_plan_dto_1.CreateSubscriptionPlanDto]),
    __metadata("design:returntype", void 0)
], SubscriptionPlansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all subscription plans (Publicly available for pricing page)' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(subscription_plan_dto_1.CreateSubscriptionPlanDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_plan_dto_1.SubscriptionPlanQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], SubscriptionPlansController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific subscription plan by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubscriptionPlansController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a subscription plan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, subscription_plan_dto_1.UpdateSubscriptionPlanDto]),
    __metadata("design:returntype", void 0)
], SubscriptionPlansController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete (deactivate) a subscription plan' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubscriptionPlansController.prototype, "remove", null);
exports.SubscriptionPlansController = SubscriptionPlansController = __decorate([
    (0, swagger_1.ApiTags)('SaaS / Subscription Plans'),
    (0, common_1.Controller)('saas/subscription-plans'),
    __metadata("design:paramtypes", [subscription_plans_service_1.SubscriptionPlansService])
], SubscriptionPlansController);
//# sourceMappingURL=subscription-plans.controller.js.map