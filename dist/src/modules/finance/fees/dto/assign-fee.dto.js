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
exports.StudentFeeAssignmentQueryOptionsDto = exports.AssignFeeDto = void 0;
const page_options_dto_1 = require("../../../../core/utils/pagination/page-options.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AssignFeeDto {
    studentId;
    feeStructureId;
    discountId;
    dueDate;
}
exports.AssignFeeDto = AssignFeeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-student' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssignFeeDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-fee-structure' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssignFeeDto.prototype, "feeStructureId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-of-fee-discount' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AssignFeeDto.prototype, "discountId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2023-11-01T00:00:00Z',
        description: 'Override default due date'
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AssignFeeDto.prototype, "dueDate", void 0);
class StudentFeeAssignmentQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
    studentId;
    feeStructureId;
    status;
}
exports.StudentFeeAssignmentQueryOptionsDto = StudentFeeAssignmentQueryOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StudentFeeAssignmentQueryOptionsDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StudentFeeAssignmentQueryOptionsDto.prototype, "feeStructureId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StudentFeeAssignmentQueryOptionsDto.prototype, "status", void 0);
//# sourceMappingURL=assign-fee.dto.js.map