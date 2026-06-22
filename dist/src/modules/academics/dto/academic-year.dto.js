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
exports.AcademicYearQueryOptionsDto = exports.UpdateAcademicYearDto = exports.CreateAcademicYearDto = void 0;
const page_options_dto_1 = require("../../../core/utils/pagination/page-options.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAcademicYearDto {
    name;
    startDate;
    endDate;
    isActive;
}
exports.CreateAcademicYearDto = CreateAcademicYearDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-2024' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAcademicYearDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-04-01T00:00:00Z' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAcademicYearDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-03-31T23:59:59Z' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAcademicYearDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateAcademicYearDto.prototype, "isActive", void 0);
class UpdateAcademicYearDto extends (0, swagger_1.PartialType)(CreateAcademicYearDto) {
}
exports.UpdateAcademicYearDto = UpdateAcademicYearDto;
class AcademicYearQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
    isActive;
}
exports.AcademicYearQueryOptionsDto = AcademicYearQueryOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by active status' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AcademicYearQueryOptionsDto.prototype, "isActive", void 0);
//# sourceMappingURL=academic-year.dto.js.map