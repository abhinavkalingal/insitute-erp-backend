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
exports.CreateSavedReportDto = exports.ReportModuleType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var ReportModuleType;
(function (ReportModuleType) {
    ReportModuleType["STUDENTS"] = "STUDENTS";
    ReportModuleType["STAFF"] = "STAFF";
    ReportModuleType["FINANCE"] = "FINANCE";
    ReportModuleType["ATTENDANCE"] = "ATTENDANCE";
    ReportModuleType["ACADEMICS"] = "ACADEMICS";
})(ReportModuleType || (exports.ReportModuleType = ReportModuleType = {}));
class CreateSavedReportDto {
    name;
    description;
    module;
    filters;
    columns;
}
exports.CreateSavedReportDto = CreateSavedReportDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSavedReportDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSavedReportDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ReportModuleType }),
    (0, class_validator_1.IsEnum)(ReportModuleType),
    __metadata("design:type", String)
], CreateSavedReportDto.prototype, "module", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'JSON string of filters to apply' }),
    (0, class_validator_1.IsJSON)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSavedReportDto.prototype, "filters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'JSON string of columns to select' }),
    (0, class_validator_1.IsJSON)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSavedReportDto.prototype, "columns", void 0);
//# sourceMappingURL=create-saved-report.dto.js.map