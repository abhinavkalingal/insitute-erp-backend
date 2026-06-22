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
exports.FeeStructureQueryOptionsDto = exports.UpdateFeeStructureDto = exports.CreateFeeStructureDto = exports.FeeCategoryQueryOptionsDto = exports.UpdateFeeCategoryDto = exports.CreateFeeCategoryDto = void 0;
const page_options_dto_1 = require("../../../core/utils/pagination/page-options.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFeeCategoryDto {
    name;
    description;
}
exports.CreateFeeCategoryDto = CreateFeeCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tuition Fee' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFeeCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Standard tuition fee for academic year' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFeeCategoryDto.prototype, "description", void 0);
class UpdateFeeCategoryDto extends (0, swagger_1.PartialType)(CreateFeeCategoryDto) {
}
exports.UpdateFeeCategoryDto = UpdateFeeCategoryDto;
class FeeCategoryQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
}
exports.FeeCategoryQueryOptionsDto = FeeCategoryQueryOptionsDto;
class CreateFeeStructureDto {
    categoryId;
    name;
    amount;
    courseId;
    batchId;
}
exports.CreateFeeStructureDto = CreateFeeStructureDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-category' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFeeStructureDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fall 2023 10th Grade Tuition' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFeeStructureDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500.0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFeeStructureDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-of-course' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFeeStructureDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-of-batch' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFeeStructureDto.prototype, "batchId", void 0);
class UpdateFeeStructureDto extends (0, swagger_1.PartialType)(CreateFeeStructureDto) {
}
exports.UpdateFeeStructureDto = UpdateFeeStructureDto;
class FeeStructureQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
    categoryId;
    courseId;
    batchId;
}
exports.FeeStructureQueryOptionsDto = FeeStructureQueryOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FeeStructureQueryOptionsDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FeeStructureQueryOptionsDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FeeStructureQueryOptionsDto.prototype, "batchId", void 0);
//# sourceMappingURL=fee.dto.js.map