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
exports.SaasPaymentQueryOptionsDto = exports.UpdateSaasPaymentStatusDto = exports.InitiateSaasPaymentDto = exports.SaasPaymentStatus = exports.SaasPaymentMethod = void 0;
const page_options_dto_1 = require("../../../../core/utils/pagination/page-options.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var SaasPaymentMethod;
(function (SaasPaymentMethod) {
    SaasPaymentMethod["CARD"] = "CARD";
    SaasPaymentMethod["UPI"] = "UPI";
    SaasPaymentMethod["NETBANKING"] = "NETBANKING";
    SaasPaymentMethod["MANUAL"] = "MANUAL";
})(SaasPaymentMethod || (exports.SaasPaymentMethod = SaasPaymentMethod = {}));
var SaasPaymentStatus;
(function (SaasPaymentStatus) {
    SaasPaymentStatus["PENDING"] = "PENDING";
    SaasPaymentStatus["SUCCESS"] = "SUCCESS";
    SaasPaymentStatus["FAILED"] = "FAILED";
})(SaasPaymentStatus || (exports.SaasPaymentStatus = SaasPaymentStatus = {}));
class InitiateSaasPaymentDto {
    invoiceId;
    amount;
    paymentMethod;
}
exports.InitiateSaasPaymentDto = InitiateSaasPaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-invoice' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InitiateSaasPaymentDto.prototype, "invoiceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 116.82 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], InitiateSaasPaymentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: SaasPaymentMethod }),
    (0, class_validator_1.IsEnum)(SaasPaymentMethod),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InitiateSaasPaymentDto.prototype, "paymentMethod", void 0);
class UpdateSaasPaymentStatusDto {
    status;
    transactionId;
    metadata;
}
exports.UpdateSaasPaymentStatusDto = UpdateSaasPaymentStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: SaasPaymentStatus }),
    (0, class_validator_1.IsEnum)(SaasPaymentStatus),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateSaasPaymentStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'txn_123456789' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSaasPaymentStatusDto.prototype, "transactionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateSaasPaymentStatusDto.prototype, "metadata", void 0);
class SaasPaymentQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
    status;
    invoiceId;
}
exports.SaasPaymentQueryOptionsDto = SaasPaymentQueryOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: SaasPaymentStatus }),
    (0, class_validator_1.IsEnum)(SaasPaymentStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaasPaymentQueryOptionsDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaasPaymentQueryOptionsDto.prototype, "invoiceId", void 0);
//# sourceMappingURL=saas-payment.dto.js.map