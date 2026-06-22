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
exports.MaterialCategoryQueryOptionsDto = exports.UpdateMaterialCategoryDto = exports.CreateMaterialCategoryDto = void 0;
const page_options_dto_1 = require("../../../../core/utils/pagination/page-options.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateMaterialCategoryDto {
    name;
    description;
}
exports.CreateMaterialCategoryDto = CreateMaterialCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Lecture Notes' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMaterialCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'PDFs of daily class notes' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMaterialCategoryDto.prototype, "description", void 0);
class UpdateMaterialCategoryDto extends (0, swagger_1.PartialType)(CreateMaterialCategoryDto) {
}
exports.UpdateMaterialCategoryDto = UpdateMaterialCategoryDto;
class MaterialCategoryQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
}
exports.MaterialCategoryQueryOptionsDto = MaterialCategoryQueryOptionsDto;
//# sourceMappingURL=category.dto.js.map