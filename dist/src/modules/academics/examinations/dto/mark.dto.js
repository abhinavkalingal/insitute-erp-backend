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
exports.MarkQueryOptionsDto = exports.BulkUpsertMarksDto = exports.StudentMarkDto = void 0;
const page_options_dto_1 = require("../../../../core/utils/pagination/page-options.dto");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class StudentMarkDto {
    studentId;
    marksObtained;
    remarks;
    isAbsent;
}
exports.StudentMarkDto = StudentMarkDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-student' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StudentMarkDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 85 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], StudentMarkDto.prototype, "marksObtained", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Good performance' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StudentMarkDto.prototype, "remarks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], StudentMarkDto.prototype, "isAbsent", void 0);
class BulkUpsertMarksDto {
    examId;
    marks;
}
exports.BulkUpsertMarksDto = BulkUpsertMarksDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-exam' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkUpsertMarksDto.prototype, "examId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [StudentMarkDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StudentMarkDto),
    __metadata("design:type", Array)
], BulkUpsertMarksDto.prototype, "marks", void 0);
class MarkQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
    examId;
    studentId;
}
exports.MarkQueryOptionsDto = MarkQueryOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MarkQueryOptionsDto.prototype, "examId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MarkQueryOptionsDto.prototype, "studentId", void 0);
//# sourceMappingURL=mark.dto.js.map