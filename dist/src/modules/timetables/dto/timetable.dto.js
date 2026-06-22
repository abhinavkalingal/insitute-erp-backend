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
exports.TimetableQueryOptionsDto = exports.UpdateTimetableDto = exports.CreateTimetableDto = exports.TimetablePeriodDto = void 0;
const page_options_dto_1 = require("../../../core/utils/pagination/page-options.dto");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class TimetablePeriodDto {
    dayOfWeek;
    startTime;
    endTime;
    subjectId;
    teacherId;
    roomId;
}
exports.TimetablePeriodDto = TimetablePeriodDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Day of week (1=Mon, 7=Sun)' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(7),
    __metadata("design:type", Number)
], TimetablePeriodDto.prototype, "dayOfWeek", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '09:00', description: 'Start time in HH:mm format' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TimetablePeriodDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10:00', description: 'End time in HH:mm format' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TimetablePeriodDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-subject' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TimetablePeriodDto.prototype, "subjectId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-of-staff' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TimetablePeriodDto.prototype, "teacherId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-of-room' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TimetablePeriodDto.prototype, "roomId", void 0);
class CreateTimetableDto {
    batchId;
    name;
    isActive;
    periods;
}
exports.CreateTimetableDto = CreateTimetableDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-batch' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTimetableDto.prototype, "batchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fall 2023 Schedule' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTimetableDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTimetableDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TimetablePeriodDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TimetablePeriodDto),
    __metadata("design:type", Array)
], CreateTimetableDto.prototype, "periods", void 0);
class UpdateTimetableDto extends (0, swagger_1.PartialType)(CreateTimetableDto) {
}
exports.UpdateTimetableDto = UpdateTimetableDto;
class TimetableQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
    batchId;
    isActive;
}
exports.TimetableQueryOptionsDto = TimetableQueryOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by batch ID' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TimetableQueryOptionsDto.prototype, "batchId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by active status' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TimetableQueryOptionsDto.prototype, "isActive", void 0);
//# sourceMappingURL=timetable.dto.js.map