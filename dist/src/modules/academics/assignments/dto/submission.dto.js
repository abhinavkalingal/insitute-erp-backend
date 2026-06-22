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
exports.SubmissionQueryOptionsDto = exports.GradeSubmissionDto = exports.CreateSubmissionDto = void 0;
const page_options_dto_1 = require("../../../../core/utils/pagination/page-options.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSubmissionDto {
    assignmentId;
    studentId;
    content;
    fileUrl;
}
exports.CreateSubmissionDto = CreateSubmissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-assignment' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubmissionDto.prototype, "assignmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-student' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubmissionDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Here is my essay text...' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubmissionDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://storage-url.com/file.pdf' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubmissionDto.prototype, "fileUrl", void 0);
class GradeSubmissionDto {
    staffId;
    marksObtained;
    feedback;
}
exports.GradeSubmissionDto = GradeSubmissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-staff' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GradeSubmissionDto.prototype, "staffId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 85 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GradeSubmissionDto.prototype, "marksObtained", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Good work, but watch your spelling.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GradeSubmissionDto.prototype, "feedback", void 0);
class SubmissionQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
    assignmentId;
    studentId;
    status;
}
exports.SubmissionQueryOptionsDto = SubmissionQueryOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SubmissionQueryOptionsDto.prototype, "assignmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SubmissionQueryOptionsDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by status: SUBMITTED, LATE, GRADED' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SubmissionQueryOptionsDto.prototype, "status", void 0);
//# sourceMappingURL=submission.dto.js.map