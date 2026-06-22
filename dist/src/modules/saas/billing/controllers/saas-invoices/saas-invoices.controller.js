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
exports.SaasInvoicesController = void 0;
const current_institute_decorator_1 = require("../../../../../core/decorators/current-institute.decorator");
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const saas_invoice_dto_1 = require("../../dto/saas-invoice.dto");
const saas_invoices_service_1 = require("../../services/saas-invoices/saas-invoices.service");
let SaasInvoicesController = class SaasInvoicesController {
    saasInvoicesService;
    constructor(saasInvoicesService) {
        this.saasInvoicesService = saasInvoicesService;
    }
    generateInvoice(instituteId, generateDto) {
        return this.saasInvoicesService.generateInvoice(instituteId, generateDto);
    }
    findAll(req, queryOptions) {
        const user = req.user;
        let instituteId = null;
        if (user.isSuperAdmin) {
            instituteId = req.headers['x-institute-id'] || null;
        }
        else {
            instituteId = user.instituteId;
        }
        return this.saasInvoicesService.findAll(instituteId, queryOptions);
    }
    findOne(id) {
        return this.saasInvoicesService.findOne(id);
    }
    voidInvoice(id) {
        return this.saasInvoicesService.voidInvoice(id);
    }
};
exports.SaasInvoicesController = SaasInvoicesController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate a new SaaS Invoice manually' }),
    __param(0, (0, current_institute_decorator_1.CurrentInstitute)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, saas_invoice_dto_1.GenerateSaasInvoiceDto]),
    __metadata("design:returntype", void 0)
], SaasInvoicesController.prototype, "generateInvoice", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all SaaS Invoices' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(saas_invoice_dto_1.GenerateSaasInvoiceDto),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, saas_invoice_dto_1.SaasInvoiceQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], SaasInvoicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('read:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific SaaS Invoice by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaasInvoicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/void'),
    (0, permissions_decorator_1.RequirePermissions)('manage:saas'),
    (0, swagger_1.ApiOperation)({ summary: 'Void an unpaid SaaS Invoice' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaasInvoicesController.prototype, "voidInvoice", null);
exports.SaasInvoicesController = SaasInvoicesController = __decorate([
    (0, swagger_1.ApiTags)('SaaS / Invoices'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('saas/billing/invoices'),
    __metadata("design:paramtypes", [saas_invoices_service_1.SaasInvoicesService])
], SaasInvoicesController);
//# sourceMappingURL=saas-invoices.controller.js.map