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
exports.SalaryStructureQueryOptionsDto = exports.UpdateSalaryStructureDto = exports.CreateSalaryStructureDto = exports.SalaryComponentDto = void 0;
const page_options_dto_1 = require("../../../../core/utils/pagination/page-options.dto");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SalaryComponentDto {
    name;
    amount;
    type;
}
exports.SalaryComponentDto = SalaryComponentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Housing Allowance' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SalaryComponentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SalaryComponentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'FIXED' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SalaryComponentDto.prototype, "type", void 0);
class CreateSalaryStructureDto {
    staffId;
    basicPay;
    allowances;
    deductions;
}
exports.CreateSalaryStructureDto = CreateSalaryStructureDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-staff' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSalaryStructureDto.prototype, "staffId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSalaryStructureDto.prototype, "basicPay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [SalaryComponentDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SalaryComponentDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateSalaryStructureDto.prototype, "allowances", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [SalaryComponentDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SalaryComponentDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateSalaryStructureDto.prototype, "deductions", void 0);
class UpdateSalaryStructureDto extends (0, swagger_1.PartialType)(CreateSalaryStructureDto) {
}
exports.UpdateSalaryStructureDto = UpdateSalaryStructureDto;
class SalaryStructureQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
    staffId;
}
exports.SalaryStructureQueryOptionsDto = SalaryStructureQueryOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SalaryStructureQueryOptionsDto.prototype, "staffId", void 0);
//# sourceMappingURL=salary-structure.dto.js.map