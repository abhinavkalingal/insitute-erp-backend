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
exports.FeeDiscountQueryOptionsDto = exports.UpdateFeeDiscountDto = exports.CreateFeeDiscountDto = exports.DiscountType = void 0;
const page_options_dto_1 = require("../../../../core/utils/pagination/page-options.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var DiscountType;
(function (DiscountType) {
    DiscountType["PERCENTAGE"] = "PERCENTAGE";
    DiscountType["FIXED"] = "FIXED";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
class CreateFeeDiscountDto {
    name;
    type;
    value;
}
exports.CreateFeeDiscountDto = CreateFeeDiscountDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sibling Discount' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFeeDiscountDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: DiscountType, example: DiscountType.PERCENTAGE }),
    (0, class_validator_1.IsEnum)(DiscountType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFeeDiscountDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFeeDiscountDto.prototype, "value", void 0);
class UpdateFeeDiscountDto extends (0, swagger_1.PartialType)(CreateFeeDiscountDto) {
}
exports.UpdateFeeDiscountDto = UpdateFeeDiscountDto;
class FeeDiscountQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
}
exports.FeeDiscountQueryOptionsDto = FeeDiscountQueryOptionsDto;
//# sourceMappingURL=fee-discount.dto.js.map