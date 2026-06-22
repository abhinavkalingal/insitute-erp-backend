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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const permissions_decorator_1 = require("../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../core/guards/permissions.guard");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const attendance_service_1 = require("./attendance.service");
const attendance_query_options_dto_1 = require("./dto/attendance-query-options.dto");
const mark_attendance_dto_1 = require("./dto/mark-attendance.dto");
let AttendanceController = class AttendanceController {
    attendanceService;
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    markAttendance(req, markAttendanceDto) {
        const takenById = req.user.id;
        return this.attendanceService.markAttendance(takenById, markAttendanceDto);
    }
    findAll(queryOptions) {
        return this.attendanceService.findAll(queryOptions);
    }
    findOne(id) {
        return this.attendanceService.findOne(id);
    }
    getStudentHistory(studentId, queryOptions) {
        return this.attendanceService.getStudentHistory(studentId, queryOptions);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Post)('mark'),
    (0, permissions_decorator_1.RequirePermissions)('create:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark or update attendance for a batch/staff' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mark_attendance_dto_1.MarkAttendanceDto]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "markAttendance", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of attendance sheets' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_query_options_dto_1.AttendanceQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific attendance sheet with all records' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get attendance history for a specific student' }),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, attendance_query_options_dto_1.AttendanceQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getStudentHistory", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, swagger_1.ApiTags)('Attendance'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('attendance'),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map