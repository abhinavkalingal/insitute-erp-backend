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
exports.TimetablesController = void 0;
const permissions_decorator_1 = require("../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const timetable_dto_1 = require("../../dto/timetable.dto");
const timetables_service_1 = require("../../services/timetables/timetables.service");
let TimetablesController = class TimetablesController {
    timetablesService;
    constructor(timetablesService) {
        this.timetablesService = timetablesService;
    }
    create(createDto) {
        return this.timetablesService.create(createDto);
    }
    findAll(queryOptions) {
        return this.timetablesService.findAll(queryOptions);
    }
    findTeacherSchedule(staffId) {
        return this.timetablesService.findTeacherSchedule(staffId);
    }
    findOne(id) {
        return this.timetablesService.findOne(id);
    }
    update(id, updateDto) {
        return this.timetablesService.update(id, updateDto);
    }
    remove(id) {
        return this.timetablesService.remove(id);
    }
};
exports.TimetablesController = TimetablesController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('create:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new timetable with periods' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [timetable_dto_1.CreateTimetableDto]),
    __metadata("design:returntype", void 0)
], TimetablesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all timetables with pagination' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(timetable_dto_1.CreateTimetableDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [timetable_dto_1.TimetableQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], TimetablesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('teacher/:staffId'),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get aggregated schedule for a specific teacher' }),
    __param(0, (0, common_1.Param)('staffId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TimetablesController.prototype, "findTeacherSchedule", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get timetable by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TimetablesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('update:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a timetable (re-syncs periods)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, timetable_dto_1.UpdateTimetableDto]),
    __metadata("design:returntype", void 0)
], TimetablesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('delete:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a timetable' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TimetablesController.prototype, "remove", null);
exports.TimetablesController = TimetablesController = __decorate([
    (0, swagger_1.ApiTags)('Timetables / Schedules'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('timetables'),
    __metadata("design:paramtypes", [timetables_service_1.TimetablesService])
], TimetablesController);
//# sourceMappingURL=timetables.controller.js.map