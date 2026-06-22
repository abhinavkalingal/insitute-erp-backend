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
exports.ScheduleReportDto = exports.ScheduleFrequency = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const execute_report_dto_1 = require("./execute-report.dto");
var ScheduleFrequency;
(function (ScheduleFrequency) {
    ScheduleFrequency["DAILY"] = "DAILY";
    ScheduleFrequency["WEEKLY"] = "WEEKLY";
    ScheduleFrequency["MONTHLY"] = "MONTHLY";
})(ScheduleFrequency || (exports.ScheduleFrequency = ScheduleFrequency = {}));
class ScheduleReportDto {
    savedReportId;
    frequency;
    format;
    recipients;
}
exports.ScheduleReportDto = ScheduleReportDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ScheduleReportDto.prototype, "savedReportId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ScheduleFrequency }),
    (0, class_validator_1.IsEnum)(ScheduleFrequency),
    __metadata("design:type", String)
], ScheduleReportDto.prototype, "frequency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: execute_report_dto_1.ExportFormat }),
    (0, class_validator_1.IsEnum)(execute_report_dto_1.ExportFormat),
    __metadata("design:type", String)
], ScheduleReportDto.prototype, "format", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'JSON array of email addresses' }),
    (0, class_validator_1.IsJSON)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ScheduleReportDto.prototype, "recipients", void 0);
//# sourceMappingURL=schedule-report.dto.js.map