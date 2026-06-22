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
exports.WebhooksController = void 0;
const current_institute_decorator_1 = require("../../../../../core/decorators/current-institute.decorator");
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const webhook_endpoint_dto_1 = require("../../dto/webhook-endpoint.dto");
const webhook_endpoints_service_1 = require("../../services/webhook-endpoints/webhook-endpoints.service");
let WebhooksController = class WebhooksController {
    webhookEndpointsService;
    constructor(webhookEndpointsService) {
        this.webhookEndpointsService = webhookEndpointsService;
    }
    createEndpoint(instituteId, dto) {
        return this.webhookEndpointsService.createEndpoint(instituteId, dto);
    }
    listEndpoints(instituteId) {
        return this.webhookEndpointsService.listEndpoints(instituteId);
    }
    deleteEndpoint(id, instituteId) {
        return this.webhookEndpointsService.deleteEndpoint(id, instituteId);
    }
};
exports.WebhooksController = WebhooksController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new webhook endpoint' }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, webhook_endpoint_dto_1.CreateWebhookEndpointDto]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "createEndpoint", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'List all registered webhook endpoints' }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "listEndpoints", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a webhook endpoint' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_institute_decorator_1.CurrentInstitute)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "deleteEndpoint", null);
exports.WebhooksController = WebhooksController = __decorate([
    (0, swagger_1.ApiTags)('SaaS / Webhooks'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('saas/webhooks'),
    __metadata("design:paramtypes", [webhook_endpoints_service_1.WebhookEndpointsService])
], WebhooksController);
//# sourceMappingURL=webhooks.controller.js.map