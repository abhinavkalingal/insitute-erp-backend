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
exports.IssuedCertificatesController = void 0;
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const issue_certificate_dto_1 = require("../../dto/issue-certificate.dto");
const issued_certificates_service_1 = require("../../services/issued-certificates/issued-certificates.service");
let IssuedCertificatesController = class IssuedCertificatesController {
    issuedCertificatesService;
    constructor(issuedCertificatesService) {
        this.issuedCertificatesService = issuedCertificatesService;
    }
    issue(issueDto) {
        return this.issuedCertificatesService.issue(issueDto);
    }
    findAll(queryOptions) {
        return this.issuedCertificatesService.findAll(queryOptions);
    }
    verifyQrCode(certificateNumber) {
        return this.issuedCertificatesService.verifyQrCode(certificateNumber);
    }
};
exports.IssuedCertificatesController = IssuedCertificatesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('create:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Issue a new certificate to a student' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [issue_certificate_dto_1.IssueCertificateDto]),
    __metadata("design:returntype", void 0)
], IssuedCertificatesController.prototype, "issue", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all issued certificates' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(issue_certificate_dto_1.IssueCertificateDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [issue_certificate_dto_1.IssuedCertificateQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], IssuedCertificatesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('verify/:certificateNumber'),
    (0, swagger_1.ApiOperation)({ summary: 'PUBLIC: Verify a certificate by its unique number (via QR Code)' }),
    __param(0, (0, common_1.Param)('certificateNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IssuedCertificatesController.prototype, "verifyQrCode", null);
exports.IssuedCertificatesController = IssuedCertificatesController = __decorate([
    (0, swagger_1.ApiTags)('Academics / Issued Certificates'),
    (0, common_1.Controller)('issued-certificates'),
    __metadata("design:paramtypes", [issued_certificates_service_1.IssuedCertificatesService])
], IssuedCertificatesController);
//# sourceMappingURL=issued-certificates.controller.js.map