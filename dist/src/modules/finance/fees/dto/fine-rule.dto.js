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
exports.FineRuleQueryOptionsDto = exports.UpdateFineRuleDto = exports.CreateFineRuleDto = exports.FineAmountType = void 0;
const page_options_dto_1 = require("../../../../core/utils/pagination/page-options.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var FineAmountType;
(function (FineAmountType) {
    FineAmountType["FIXED"] = "FIXED";
    FineAmountType["PERCENTAGE_PER_DAY"] = "PERCENTAGE_PER_DAY";
})(FineAmountType || (exports.FineAmountType = FineAmountType = {}));
class CreateFineRuleDto {
    name;
    amountType;
    amount;
    daysAfterDueDate;
}
exports.CreateFineRuleDto = CreateFineRuleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Standard Late Penalty' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFineRuleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: FineAmountType, example: FineAmountType.FIXED }),
    (0, class_validator_1.IsEnum)(FineAmountType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFineRuleDto.prototype, "amountType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFineRuleDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateFineRuleDto.prototype, "daysAfterDueDate", void 0);
class UpdateFineRuleDto extends (0, swagger_1.PartialType)(CreateFineRuleDto) {
}
exports.UpdateFineRuleDto = UpdateFineRuleDto;
class FineRuleQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
}
exports.FineRuleQueryOptionsDto = FineRuleQueryOptionsDto;
//# sourceMappingURL=fine-rule.dto.js.map