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
exports.MarkAttendanceDto = exports.AttendanceRecordDto = exports.AttendanceStatus = exports.AttendanceType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var AttendanceType;
(function (AttendanceType) {
    AttendanceType["STUDENT"] = "STUDENT";
    AttendanceType["STAFF"] = "STAFF";
})(AttendanceType || (exports.AttendanceType = AttendanceType = {}));
var AttendanceStatus;
(function (AttendanceStatus) {
    AttendanceStatus["PRESENT"] = "PRESENT";
    AttendanceStatus["ABSENT"] = "ABSENT";
    AttendanceStatus["LATE"] = "LATE";
    AttendanceStatus["HALF_DAY"] = "HALF_DAY";
    AttendanceStatus["EXCUSED"] = "EXCUSED";
})(AttendanceStatus || (exports.AttendanceStatus = AttendanceStatus = {}));
class AttendanceRecordDto {
    studentId;
    staffId;
    status;
    remarks;
}
exports.AttendanceRecordDto = AttendanceRecordDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID of the student (if type=STUDENT)' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AttendanceRecordDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID of the staff (if type=STAFF)' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AttendanceRecordDto.prototype, "staffId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: AttendanceStatus }),
    (0, class_validator_1.IsEnum)(AttendanceStatus),
    __metadata("design:type", String)
], AttendanceRecordDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Traffic' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AttendanceRecordDto.prototype, "remarks", void 0);
class MarkAttendanceDto {
    date;
    type;
    batchId;
    branchId;
    records;
}
exports.MarkAttendanceDto = MarkAttendanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-10-15T00:00:00Z',
        description: 'Date of attendance. Time portion will be ignored.'
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MarkAttendanceDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: AttendanceType }),
    (0, class_validator_1.IsEnum)(AttendanceType),
    __metadata("design:type", String)
], MarkAttendanceDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Required if type is STUDENT' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MarkAttendanceDto.prototype, "batchId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Optional department/branch filter for STAFF' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MarkAttendanceDto.prototype, "branchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AttendanceRecordDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AttendanceRecordDto),
    __metadata("design:type", Array)
], MarkAttendanceDto.prototype, "records", void 0);
//# sourceMappingURL=mark-attendance.dto.js.map