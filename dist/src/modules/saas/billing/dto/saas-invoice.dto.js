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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaasInvoiceQueryOptionsDto = exports.GenerateSaasInvoiceDto = exports.SaasInvoiceStatus = void 0;
const page_options_dto_1 = require("../../../../core/utils/pagination/page-options.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var SaasInvoiceStatus;
(function (SaasInvoiceStatus) {
    SaasInvoiceStatus["DUE"] = "DUE";
    SaasInvoiceStatus["PAID"] = "PAID";
    SaasInvoiceStatus["FAILED"] = "FAILED";
    SaasInvoiceStatus["VOID"] = "VOID";
})(SaasInvoiceStatus || (exports.SaasInvoiceStatus = SaasInvoiceStatus = {}));
class GenerateSaasInvoiceDto {
    subscriptionId;
    amount;
    dueDate;
}
exports.GenerateSaasInvoiceDto = GenerateSaasInvoiceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-of-subscription' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GenerateSaasInvoiceDto.prototype, "subscriptionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 99.0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GenerateSaasInvoiceDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-12-31T23:59:59.000Z' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GenerateSaasInvoiceDto.prototype, "dueDate", void 0);
class SaasInvoiceQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
    status;
}
exports.SaasInvoiceQueryOptionsDto = SaasInvoiceQueryOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: SaasInvoiceStatus }),
    (0, class_validator_1.IsEnum)(SaasInvoiceStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaasInvoiceQueryOptionsDto.prototype, "status", void 0);
//# sourceMappingURL=saas-invoice.dto.js.map