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
exports.ExpenseCategoryQueryOptionsDto = exports.UpdateExpenseCategoryDto = exports.CreateExpenseCategoryDto = void 0;
const page_options_dto_1 = require("../../../../core/utils/pagination/page-options.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateExpenseCategoryDto {
    name;
    description;
}
exports.CreateExpenseCategoryDto = CreateExpenseCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Maintenance' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExpenseCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Repairs and general upkeep' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateExpenseCategoryDto.prototype, "description", void 0);
class UpdateExpenseCategoryDto extends (0, swagger_1.PartialType)(CreateExpenseCategoryDto) {
}
exports.UpdateExpenseCategoryDto = UpdateExpenseCategoryDto;
class ExpenseCategoryQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
}
exports.ExpenseCategoryQueryOptionsDto = ExpenseCategoryQueryOptionsDto;
//# sourceMappingURL=expense-category.dto.js.map