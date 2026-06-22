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
exports.SaasPaymentsController = void 0;
const current_institute_decorator_1 = require("../../../../../core/decorators/current-institute.decorator");
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const saas_payment_dto_1 = require("../../dto/saas-payment.dto");
const saas_payments_service_1 = require("../../services/saas-payments/saas-payments.service");
let SaasPaymentsController = class SaasPaymentsController {
    saasPaymentsService;
    constructor(saasPaymentsService) {
        this.saasPaymentsService = saasPaymentsService;
    }
    initiatePayment(instituteId, initiateDto) {
        return this.saasPaymentsService.initiatePayment(instituteId, initiateDto);
    }
    updatePaymentStatus(id, updateDto) {
        return this.saasPaymentsService.updatePaymentStatus(id, updateDto);
    }
    findAll(instituteId, queryOptions) {
        return this.saasPaymentsService.findAll(instituteId, queryOptions);
    }
    findOne(id) {
        return this.saasPaymentsService.findOne(id);
    }
};
exports.SaasPaymentsController = SaasPaymentsController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('update:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Initiate a new payment attempt for an invoice' }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, saas_payment_dto_1.InitiateSaasPaymentDto]),
    __metadata("design:returntype", void 0)
], SaasPaymentsController.prototype, "initiatePayment", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Update the status of a payment (e.g. from PENDING to SUCCESS)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, saas_payment_dto_1.UpdateSaasPaymentStatusDto]),
    __metadata("design:returntype", void 0)
], SaasPaymentsController.prototype, "updatePaymentStatus", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all SaaS Payments' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(saas_payment_dto_1.InitiateSaasPaymentDto),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, saas_payment_dto_1.SaasPaymentQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], SaasPaymentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('read:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific SaaS Payment by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaasPaymentsController.prototype, "findOne", null);
exports.SaasPaymentsController = SaasPaymentsController = __decorate([
    (0, swagger_1.ApiTags)('SaaS / Payments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('saas/billing/payments'),
    __metadata("design:paramtypes", [saas_payments_service_1.SaasPaymentsService])
], SaasPaymentsController);
//# sourceMappingURL=saas-payments.controller.js.map