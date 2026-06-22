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
exports.SubscriptionQueryOptionsDto = exports.UpgradeDowngradeDto = exports.SubscribeDto = exports.BillingCycle = void 0;
const page_options_dto_1 = require("../../../../core/utils/pagination/page-options.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var BillingCycle;
(function (BillingCycle) {
    BillingCycle["MONTHLY"] = "MONTHLY";
    BillingCycle["YEARLY"] = "YEARLY";
})(BillingCycle || (exports.BillingCycle = BillingCycle = {}));
class SubscribeDto {
    planId;
    billingCycle;
}
exports.SubscribeDto = SubscribeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-plan' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SubscribeDto.prototype, "planId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: BillingCycle }),
    (0, class_validator_1.IsEnum)(BillingCycle),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SubscribeDto.prototype, "billingCycle", void 0);
class UpgradeDowngradeDto {
    planId;
    billingCycle;
}
exports.UpgradeDowngradeDto = UpgradeDowngradeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-new-plan' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpgradeDowngradeDto.prototype, "planId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: BillingCycle }),
    (0, class_validator_1.IsEnum)(BillingCycle),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpgradeDowngradeDto.prototype, "billingCycle", void 0);
class SubscriptionQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
    status;
}
exports.SubscriptionQueryOptionsDto = SubscriptionQueryOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SubscriptionQueryOptionsDto.prototype, "status", void 0);
//# sourceMappingURL=subscription.dto.js.map