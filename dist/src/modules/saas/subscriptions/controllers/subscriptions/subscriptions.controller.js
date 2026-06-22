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
exports.SubscriptionsController = void 0;
const current_institute_decorator_1 = require("../../../../../core/decorators/current-institute.decorator");
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const subscription_dto_1 = require("../../dto/subscription.dto");
const subscriptions_service_1 = require("../../services/subscriptions/subscriptions.service");
let SubscriptionsController = class SubscriptionsController {
    subscriptionsService;
    constructor(subscriptionsService) {
        this.subscriptionsService = subscriptionsService;
    }
    getMySubscription(instituteId) {
        return this.subscriptionsService.getMySubscription(instituteId);
    }
    subscribe(instituteId, subscribeDto) {
        return this.subscriptionsService.subscribe(instituteId, subscribeDto);
    }
    changePlan(instituteId, changeDto) {
        return this.subscriptionsService.changePlan(instituteId, changeDto);
    }
    cancel(instituteId) {
        return this.subscriptionsService.cancel(instituteId);
    }
    renew(instituteId) {
        return this.subscriptionsService.renew(instituteId);
    }
};
exports.SubscriptionsController = SubscriptionsController;
__decorate([
    (0, common_1.Get)('my-subscription'),
    (0, permissions_decorator_1.RequirePermissions)('read:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current institute subscription details and history' }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubscriptionsController.prototype, "getMySubscription", null);
__decorate([
    (0, common_1.Post)('subscribe'),
    (0, permissions_decorator_1.RequirePermissions)('update:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Subscribe to a plan (if not already subscribed)' }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, subscription_dto_1.SubscribeDto]),
    __metadata("design:returntype", void 0)
], SubscriptionsController.prototype, "subscribe", null);
__decorate([
    (0, common_1.Post)('change-plan'),
    (0, permissions_decorator_1.RequirePermissions)('update:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Upgrade or Downgrade to a different plan' }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, subscription_dto_1.UpgradeDowngradeDto]),
    __metadata("design:returntype", void 0)
], SubscriptionsController.prototype, "changePlan", null);
__decorate([
    (0, common_1.Post)('cancel'),
    (0, permissions_decorator_1.RequirePermissions)('update:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel subscription (takes effect at period end)' }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubscriptionsController.prototype, "cancel", null);
__decorate([
    (0, common_1.Post)('renew'),
    (0, permissions_decorator_1.RequirePermissions)('update:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Manually renew an active subscription or revoke cancellation' }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubscriptionsController.prototype, "renew", null);
exports.SubscriptionsController = SubscriptionsController = __decorate([
    (0, swagger_1.ApiTags)('SaaS / Subscriptions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('saas/subscriptions'),
    __metadata("design:paramtypes", [subscriptions_service_1.SubscriptionsService])
], SubscriptionsController);
//# sourceMappingURL=subscriptions.controller.js.map